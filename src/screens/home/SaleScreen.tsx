import { Animated, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Store'
import { useGlobalStyles } from '../../hooks/useGlobalStyles';
import * as  yup from 'yup';
import { AppStrings } from '../../utils/AppStrings';
import { Fonts } from '../../styles/Fonts';
import { FontSizes } from '../../styles/FontSizes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useFormik } from 'formik';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { Table, Row } from 'react-native-table-component';
import CustomHeader from '../../components/CustomHeader';
import { Icons } from '../../utils/IconsPaths';
import { DropDownListProps, panelesTableListData, paymentTableData, quickActionButtonData, saleMasterTableData } from '../../utils/Constats';
import { AppAlert } from '../../utils/AppAlerts';
import { useIsFocused } from '@react-navigation/native';
import { getUserDetails } from '../../redux/slice/authSlice/AuthSlice';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import CustomContainer from '../../components/CustomContainer';
import ReactNativeModal from 'react-native-modal';
import CommonDropDownComponent from '../../components/CustomDropdownFeild';
import CustomTextInput from '../../components/CustomTextInput';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import { getAccountList } from '../../redux/slice/accountSlice/AccountSlice';
import { IDropdownRef } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import { deleteItemReducer, deleteItems, getAllItemList } from '../../redux/slice/saleSlice/SaleSlice';
import { deleteItemDetailsReducer, deletePaymentDetailsReducer } from '../../redux/slice/paymentSlice/PaymentSlice';

const saleFieldSchema = yup.object().shape({
    billNo: yup.number(),
    group: yup.string().trim(),
    date: yup.string().trim(),
});

const SaleScreen = () => {

    const Styles = useStyles();
    const GlobalStyles = useGlobalStyles();
    const dispatch = useAppDispatch();
    const navigation = useCustomNavigation('DrawerStack')
    const focus = useIsFocused()
    const openAccountDropdownRef = useRef<IDropdownRef | null | undefined>(null);

    const { colors } = useAppSelector((state) => state.CommonSlice);
    const { isLoading } = useAppSelector(state => state.AuthSlice)
    const { isLoading: loading, accountListData } = useAppSelector(state => state.AccountSlice);
    const { isLoading: itemLoading, itemListData } = useAppSelector(state => state.SaleSlice);
    const { ItemDetailsData, paymentListData } = useAppSelector(state => state.PaymentSlice)

    const [accountList, SetAccountList] = useState<DropDownListProps[]>();
    const [isVisibleQuickActionBtn, setIsVisibleQuickActionBtn] = useState<boolean>(false);
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false)
    const [date, setDate] = useState(new Date());
    const [masterTableData, setMasterTableData] = useState<string[][] | []>([]);
    const [panelsTableData, setPanelsTableData] = useState<string[][] | []>([]);
    const [paymentTable, setPaymentTable] = useState(paymentTableData)
    const saleMasterTableHeader = ["Item name", "Action"];
    const saleMasterTableWidth = [wp(30), wp(13)];

    const panelsTableHeader = ["Panels", "Action"];
    const panelsTableWidth = [wp(30), wp(13)];

    const totalSaleHeader = ["", "Pc", "Total"]
    const totalSaleWidth = [wp(30), wp(25), wp(20)]

    useEffect(() => {
        if (focus) {
            dispatch(getUserDetails(null)).unwrap()
                .then(res => { })
                .catch(e => {
                    console.log("🚀 ~ file: SaleScreen.tsx:79 ~ useEffect ~ e:", e)
                })
            dispatch(getAccountList(null)).unwrap()
                .then(res => { }).catch(e => {
                    console.log("🚀 ~ file: SaleScreen.tsx:81 ~ .then ~ e:", e)
                })
            dispatch(getAllItemList(null)).unwrap().then(res => { })
                .catch(e => {
                    console.log("🚀 ~ file: SaleScreen.tsx:80 ~ useEffect ~ e:", e)
                })
        }
    }, [focus]);

    useEffect(() => {
        const combinedData = itemListData?.results?.map(item => {
            const itemDetailData = ItemDetailsData.find(data1Item => data1Item.id.toString() === item.id.toString());
            if (itemDetailData?.id) {
                return [itemDetailData.itemName, itemDetailData.grwt, itemDetailData.netwt, itemDetailData.fine, itemDetailData.id.toString()];
            } else {
                return [item.name, "", "", "", item.id.toString()];
            }
        });
        combinedData && setMasterTableData(combinedData);
    }, [itemListData]);

    useEffect(() => {
        const itemDetailData = paymentListData?.map(data1Item => [data1Item.panels, data1Item.method, data1Item.grwt, data1Item.rate, data1Item.id.toString()])
        setPanelsTableData(itemDetailData)
    }, [paymentListData]);

    useEffect(() => {
        const paymentMethod = paymentListData?.map(item => [item.panels, item.method, item.grwt, item.fine, item.rate, item.total, item.id.toString()])
        setPaymentTable([...paymentTableData, ...paymentMethod]);
    }, [panelsTableData]);

    useEffect(() => {
        if (accountListData) {
            const data = accountListData?.results?.map(item => ({
                id: item.id,
                label: item.name,
                value: item.name,
            }));
            SetAccountList(data);
        }
    }, [accountListData]);

    const {
        handleChange,
        values,
        setFieldValue,
    } = useFormik({
        initialValues: {
            billNo: '',
            group: '',
            date: '',
        },
        enableReinitialize: true,
        validationSchema: saleFieldSchema,
        onSubmit: (values) => {
            console.log("🚀 ~ file: SaleScreen.tsx:64 ~ SaleScreen ~ values:", values)
        }
    });

    const deleteRow = (index: number | string, type: "masterSaleTable" | "panelsTableData") => {
        AppAlert(AppStrings.are_you_sure, AppStrings.are_you_delete_Item, () => {
            if (type === 'masterSaleTable') {
                if (index) {
                    dispatch(deleteItems(Number(index))).unwrap()
                        .then(res => {
                            const filterData = itemListData?.results?.filter((res) => res.id !== Number(index))
                            dispatch(deleteItemReducer({
                                ...itemListData,
                                results: filterData
                            }))
                            dispatch(deleteItemDetailsReducer(Number(index)))
                        })
                        .catch(e => {
                            console.log("🚀 ~ file: SaleScreen.tsx:180 ~ AppAlert ~ e:", e)
                        })
                }
            } else {
                dispatch(deletePaymentDetailsReducer(Number(index)))
            }
        })
    }

    const ItemSeparatorComponent = () => (
        <View style={Styles.itemSeperatorLine} />
    );

    return (
        <View style={[GlobalStyles.container]}>
            {(isLoading || loading || itemLoading) ? <CustomActivityIndicator /> : null}
            <CustomHeader
                icon={Icons.MENU_ICON}
                onPress={() => {
                    navigation.openDrawer()
                }}
                title={AppStrings.sale}
                headerRightComponent={
                    <TouchableOpacity style={Styles.headerProfileBtnContainer}>
                        <Image source={Icons.USERPROFILE} style={Styles.profileIconStyle} />
                    </TouchableOpacity>
                }
            />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <CustomContainer>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <CommonDropDownComponent
                                dropDownRef={openAccountDropdownRef}
                                labelField="label"
                                valueField="value"
                                placeholder={AppStrings.add_item_modal_placeHolder.select_group}
                                data={accountList ?? []}
                                value={values.group}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("group", item.value);
                                }}
                                borderStyle={[Styles.dropDownContainerStyle]}
                                flatListProps={{
                                    keyExtractor: (item) => item.id,
                                    ListFooterComponent: () => {
                                        return (
                                            <>
                                                <Text style={Styles.addAccountText}>{"Add"}</Text>
                                                <TouchableOpacity
                                                    style={{ paddingVertical: wp(3), paddingHorizontal: wp(5) }}
                                                    onPress={() => {
                                                        openAccountDropdownRef?.current?.close()
                                                    }}
                                                >
                                                    <Text style={Styles.textInputLabelText}>{AppStrings.add_account}</Text>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    }
                                }}

                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpenDatePicker(true)
                                }}
                                activeOpacity={1}
                                style={Styles.datePickerBtnContainer}>

                                <View style={[Styles.textInputRowContainer, { alignItems: 'center', paddingHorizontal: wp(3) }]}>
                                    <Text style={Styles.datePickerTextStyle}>{moment(date).format("DD-MM-YYYY")}</Text>
                                    <Image source={Icons.DATEPICKERICONS} style={GlobalStyles.commonIconStyle} />
                                </View>
                                <DatePicker
                                    modal
                                    open={openDatePicker}
                                    date={date}
                                    androidVariant='iosClone'
                                    mode='date'
                                    onConfirm={(date) => {
                                        setOpenDatePicker(false)
                                        setDate(date)
                                        setFieldValue("date", moment(date).format('DD-MM-YYYY'));
                                    }}
                                    onCancel={() => {
                                        setOpenDatePicker(false)
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[Styles.textInputRowContainer, { marginTop: wp(3) }]}>
                        <View>
                            <CustomTextInput
                                placeholder={AppStrings.billNo}
                                value={values.billNo}
                                style={Styles.textInputContainerStyle}
                                onChangeText={handleChange('billNo')}
                            />
                        </View>
                    </View>
                    <View style={Styles.spacerContainer}>
                        <Table borderStyle={Styles.tableStyle}>
                            <Row data={saleMasterTableHeader} widthArr={saleMasterTableWidth} style={Styles.headerRow} textStyle={Styles.headerText} />
                            {masterTableData?.map((rowData, rowIndex) => (
                                <Row key={rowIndex} data={rowData.map((cellData, cellIndex) => {
                                    return (
                                        rowData?.length - 1 === cellIndex ?
                                            <View style={[GlobalStyles.rowContainer, { justifyContent: 'space-evenly', }]}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        navigation.navigate('AddItemDetailsScreen', {
                                                            itemId: Number(rowData[rowData?.length - 1]),
                                                            itemName: rowData[0]
                                                        })
                                                    }}
                                                >
                                                    <Image source={Icons.UPDATEICONS} style={Styles.actionIconStyle} />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        deleteRow(rowData[rowData.length - 1], "masterSaleTable")
                                                    }}
                                                >
                                                    <Image
                                                        source={Icons.DELETEICONS}
                                                        style={Styles.actionIconStyle}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <Text style={Styles.headerText}>{cellData}</Text>
                                    )
                                })}
                                    widthArr={saleMasterTableWidth}
                                    style={Styles.dataRow} textStyle={Styles.tableRowTextStyle} />
                            ))}
                        </Table>
                    </View>
                    <View style={Styles.spacerContainer}>
                        <Table borderStyle={Styles.tableStyle}>
                            <Row data={panelsTableHeader} widthArr={panelsTableWidth} style={Styles.headerRow} textStyle={Styles.headerText} />
                            {panelsTableData.map((rowData, rowIndex) => (
                                <Row key={rowIndex} data={rowData.map((cellData, cellIndex) => {
                                    return (
                                        rowData.length - 1 === cellIndex ?
                                            <View style={[GlobalStyles.rowContainer, { justifyContent: 'space-evenly', }]}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        navigation.navigate('AddPaymentScreen', {
                                                            itemId: Number(rowData[rowData?.length - 1])
                                                        })
                                                    }}
                                                >
                                                    <Image source={Icons.UPDATEICONS} style={Styles.actionIconStyle} />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        deleteRow(rowData[rowData.length - 1], "panelsTableData")
                                                    }}
                                                >
                                                    <Image
                                                        source={Icons.DELETEICONS}
                                                        style={Styles.actionIconStyle}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <Text style={Styles.headerText}>{cellData}</Text>
                                    )
                                })}
                                    widthArr={panelsTableWidth}
                                    style={Styles.dataRow} textStyle={Styles.tableRowTextStyle} />
                            ))}
                        </Table>
                    </View>
                    <View style={Styles.spacerContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Table borderStyle={Styles.tableStyle}>
                                <Row data={totalSaleHeader} widthArr={totalSaleWidth} style={Styles.headerRow} textStyle={Styles.headerText} />
                                {paymentTable.map((rowData, rowIndex) => (
                                    <Row key={rowIndex} data={rowData.map((cellData, cellIndex) => {
                                        return (
                                            cellIndex === 0 ?
                                                <Text style={[Styles.headerText, { backgroundColor: colors.PRIMARY_LIGHT_BACKGROUND, paddingVertical: wp(3) }]}>{cellData}</Text>
                                                :
                                                <Text style={Styles.headerText}>{cellData}</Text>
                                        )
                                    })}
                                        widthArr={totalSaleWidth}
                                        style={Styles.dataRow} textStyle={Styles.tableRowTextStyle} />
                                ))}
                            </Table>
                        </ScrollView>
                    </View>
                    <View style={Styles.spacerContainer}>
                        <View style={Styles.paymentContainer}>
                            <View style={GlobalStyles.rowContainer}>
                                <Text style={[Styles.totalTextInputLableText, { marginRight: wp(10) }]}>{AppStrings.balance}</Text>
                                <CustomTextInput style={Styles.totalPaymentTextInput} textInputContainerStyle={Styles.totalPaymentTextInputContainer} />
                                <CustomTextInput style={Styles.totalPaymentTextInput} textInputContainerStyle={Styles.totalPaymentTextInputContainer} />
                            </View>
                            <View style={Styles.spacerContainer} />
                            <View style={GlobalStyles.rowContainer}>
                                <Text style={[Styles.totalTextInputLableText, { marginRight: wp(7) }]}>{AppStrings.sub_total}</Text>
                                <CustomTextInput style={Styles.totalPaymentTextInput} textInputContainerStyle={Styles.totalPaymentTextInputContainer} />
                                <CustomTextInput style={Styles.totalPaymentTextInput} textInputContainerStyle={Styles.totalPaymentTextInputContainer} />
                            </View>
                            <View style={Styles.spacerContainer} />
                            <View style={GlobalStyles.rowContainer}>
                                <Text style={[Styles.totalTextInputLableText, { marginRight: wp(4) }]}>{AppStrings.adjustment}</Text>
                                <CustomTextInput style={Styles.totalPaymentTextInput} textInputContainerStyle={Styles.totalPaymentTextInputContainer} />
                                <CustomTextInput style={Styles.totalPaymentTextInput} textInputContainerStyle={Styles.totalPaymentTextInputContainer} />
                            </View>
                            <View style={Styles.spacerContainer} />
                            <View style={Styles.dottedLineStyle} />
                            <View style={[GlobalStyles.rowContainer, { justifyContent: 'space-between' }]}>
                                <Text style={Styles.totalTextStyle}>{AppStrings.total}</Text>
                                <Text style={Styles.totalTextStyle}>{0}</Text>
                            </View>
                        </View>
                    </View>

                </CustomContainer>

            </KeyboardAwareScrollView>
            <View style={[GlobalStyles.rowContainer, { padding: wp(5) }]}>
                <CustomPrimaryButton
                    title={AppStrings.add_item}
                    onPress={() => {
                        navigation.navigate('AddSaleItemScreen')
                    }}
                    style={[Styles.rowButtonContainerStyles, Styles.bottomRowBtnContainerStyle, Styles.secondaryBtnContainer]}
                    txtStyle={Styles.secondaryBtnText}
                />
                <CustomPrimaryButton
                    title={AppStrings.add_payment}
                    onPress={() => {
                        navigation.navigate('AddPaymentScreen', { itemId: undefined })
                    }}
                    style={[Styles.rowButtonContainerStyles, Styles.bottomRowBtnContainerStyle, Styles.secondaryBtnContainer]}
                    txtStyle={Styles.secondaryBtnText}
                />
                <CustomPrimaryButton title={AppStrings.save} onPress={() => {
                    // navigation.navigate('')
                }}
                    style={[Styles.rowButtonContainerStyles, Styles.bottomRowBtnContainerStyle]}
                    txtStyle={Styles.bottomBtnTextStyle}
                />
            </View>
            <TouchableOpacity
                style={Styles.floatingActionBtn}
                activeOpacity={1}
                onPress={() => {
                    setIsVisibleQuickActionBtn(!isVisibleQuickActionBtn)
                }}
            >
                <Image source={Icons.QUICKACTIONBTN} style={[Styles.flotingBtnIconStyle,
                isVisibleQuickActionBtn ? {
                    transform: [{ rotate: '135deg' }]
                } : undefined
                ]} />
            </TouchableOpacity>
            {
                isVisibleQuickActionBtn ?
                    <ReactNativeModal isVisible={isVisibleQuickActionBtn}
                        backdropOpacity={0.4}
                        animationIn="fadeIn"
                        onBackdropPress={() => setIsVisibleQuickActionBtn(false)}
                        animationOut="fadeOut">
                        <>
                            <View style={Styles.floatingButtonContainer}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={quickActionButtonData}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={0.3}
                                                style={Styles.floatingButtonItemBtnContainer}
                                                onPress={() => {
                                                    setIsVisibleQuickActionBtn(false)
                                                    navigation.navigate(item.screenName)
                                                }}
                                            >
                                                <Text
                                                    style={Styles.floatingButtonItemStyle}>
                                                    {item.title}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                    ItemSeparatorComponent={ItemSeparatorComponent}
                                />
                                <View style={Styles.floatingButtonTrigleContainer} />
                            </View>
                        </>
                    </ReactNativeModal> : null
            }
        </View >
    )
}

export default SaleScreen;

const useStyles = () => {

    const GlobalStyles = useGlobalStyles();
    const { colors } = useAppSelector((state) => state.CommonSlice);

    return StyleSheet.create({
        headerRow: {
            backgroundColor: colors.PRIMARY_LIGHT_BACKGROUND,
            height: hp(5)
        },
        tableStyle: {
            borderWidth: 1,
            borderColor: '#C1C0B9'
        },
        headerText: {
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            fontSize: FontSizes.FONT_SIZE_13,
            color: colors.PRIMARY_TEXT,
            maxWidth: wp(100),
            textAlign: 'center'
        },
        spacerContainer: {
            marginTop: wp(5)
        },
        dataRow: {
            minHeight: wp(10),
            backgroundColor: colors.PRIMARY_BACKGROUND,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        tableRowTextStyle: {
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            fontSize: FontSizes.FONT_SIZE_14,
            color: colors.PRIMARY_TEXT,
            alignSelf: 'center'
        },
        textInputRowContainer: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: "space-between"
        },
        textInputContainerStyle: {
            width: wp(35)
        },
        textInputLablePreFixTextStyle: {
            color: colors.ERROR_TEXT,
            marginTop: wp(3),
            marginBottom: wp(2),
            alignSelf: 'flex-start'
        },
        textInputLabelText: {
            color: colors.PRIMARY_TEXT,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            fontSize: FontSizes.FONT_SIZE_14,
        },
        actionIconStyle: {
            width: wp(5.5),
            height: wp(5.5),
            resizeMode: 'contain',
        },
        floatingActionBtn: {
            position: 'absolute',
            bottom: wp(20),
            right: wp(5),
            padding: wp(2.5),
            borderRadius: wp(10),
            backgroundColor: colors.PRIMARY
        },
        flotingBtnIconStyle: {
            width: wp(12),
            height: wp(12),
            resizeMode: 'contain'
        },
        profileIconStyle: {
            ...GlobalStyles.commonIconStyle,
            tintColor: colors.WHITE_ICON
        },
        headerProfileBtnContainer: {
            backgroundColor: colors.PRIMARY,
            padding: wp(2.5),
            borderRadius: wp(10)
        },
        floatingButtonContainer: {
            backgroundColor: 'white',
            position: 'absolute',
            width: wp(45.5),
            height: wp(73),
            bottom: wp(36),
            right: wp(-1),
            borderRadius: wp(3),
            paddingVertical: wp(3),
        },
        floatingButtonTrigleContainer: {
            position: 'absolute',
            bottom: wp(-2),
            right: wp(6),
            height: hp(3),
            width: hp(3),
            backgroundColor: "white",
            borderRadius: hp(0.5),
            transform: [
                { rotate: "45deg" },
            ],
        },
        floatingButtonItemStyle: {
            fontSize: FontSizes.FONT_SIZE_14,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            color: colors.PRIMARY_TEXT,
        },
        itemSeperatorLine: {
            width: "95%",
            height: hp(0.1),
            alignSelf: "center",
            marginVertical: wp(1),
            backgroundColor: colors.ITEM_SEPRATOR_COLOR,
        },
        floatingButtonItemBtnContainer: {
            paddingVertical: wp(2),
            paddingHorizontal: wp(5),
        },
        dropDownContainerStyle: {
            width: wp(43),
            borderRadius: wp(2)
        },
        datePickerBtnContainer: {
            width: wp(43),
            paddingVertical: wp(2),
            borderRadius: wp(1),
            borderWidth: wp(0.2),
            borderColor: colors.BOX_BORDER,
            backgroundColor: colors.PRIMARY_BACKGROUND
        },
        datePickerTextStyle: {
            fontSize: FontSizes.FONT_SIZE_14,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_REGULAR,
            color: colors.PRIMARY_TEXT,
        },
        totalPaymentTextInputContainer: {
            marginRight: wp(3),
            borderColor: colors.BOX_DARK_BORDER,
            borderStyle: 'dashed',
            backgroundColor: colors.PRIMARY_BACKGROUND
        },
        totalPaymentTextInput: {
            width: wp(21)
        },
        paymentContainer: {
            backgroundColor: colors.PRIMARY_LIGHT_BACKGROUND,
            padding: wp(2.5),
            borderWidth: wp(0.2),
            borderColor: colors.BOX_BORDER
        },
        dottedLineStyle: {
            borderWidth: wp(0.3),
            borderColor: colors.BOX_DARK_BORDER,
            borderStyle: 'dashed',
        },
        totalTextStyle: {
            fontSize: FontSizes.FONT_SIZE_16,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_BOLD,
            color: colors.PRIMARY_TEXT,
            paddingVertical: wp(2)
        },
        totalTextInputLableText: {
            fontSize: FontSizes.FONT_SIZE_13,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            color: colors.PRIMARY_TEXT
        },
        bottomRowBtnContainerStyle: {
            flex: 1,
            marginRight: wp(2)
        },
        rowButtonContainerStyles: {
            width: wp(20),
            borderRadius: wp(2),
            alignSelf: 'center',
            borderWidth: wp(0.3),
            borderColor: colors.TRANSPARENT
        },
        bottomBtnTextStyle: {
            fontSize: FontSizes.FONT_SIZE_13,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            color: colors.BUTTON_TEXT
        },
        secondaryBtnText: {
            fontSize: FontSizes.FONT_SIZE_13,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            color: colors.SECONDARY_TEXT
        },
        secondaryBtnContainer: {
            backgroundColor: colors.PRIMARY_BACKGROUND,
            borderColor: colors.BOX_DARK_BORDER,
            borderWidth: wp(0.2),
        },
        addAccountText: {
            fontSize: FontSizes.FONT_SIZE_13,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_REGULAR,
            color: colors.SECONDARY_TEXT,
            marginTop: wp(2),
            paddingHorizontal: wp(2)
        }
    })
};
