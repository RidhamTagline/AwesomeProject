import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useGlobalStyles } from '../../hooks/useGlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import { AppStrings } from '../../utils/AppStrings';
import { Icons } from '../../utils/IconsPaths';
import CustomContainer from '../../components/CustomContainer';
import { useAppSelector } from '../../redux/Store';
import { Fonts } from '../../styles/Fonts';
import { FontSizes } from '../../styles/FontSizes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CommonDropDownComponent from '../../components/CustomDropdownFeild';
import { DropDownListProps, ledgerTableData } from '../../utils/Constats';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import { Row, Table } from 'react-native-table-component';


const CustomerLedgerScreen = () => {

    const Styles = useStyles();
    const GlobalStyles = useGlobalStyles();
    const navigation = useCustomNavigation('DrawerStack');
    const { colors } = useAppSelector(state => state.CommonSlice)
    const [openStartDatePicker, setOpenStartDatePicker] = useState<boolean>(false)
    const [startDate, setStartDate] = useState(new Date());
    const [openEndDatePicker, setOpenEndDatePicker] = useState<boolean>(false)
    const [endDate, setEndDate] = useState(new Date());
    const [customerLedgerTableData, setCustomerLedgerTableData] = useState(ledgerTableData);

    const saleMasterTableHeader = ["Date", "Ref No", "Narration", "Tag no.", "Purity", "Gr.Wt", "Less", "Net.Wt", "Tunch", "Wstg", "Rate", "Lbr", "On", "Fine", "Amount"];
    const saleMasterTableWidth = [wp(25), wp(45), wp(20), wp(20), wp(20), wp(20), wp(20), wp(20), wp(20), wp(20), wp(20), wp(20), wp(20), wp(20), wp(20)];

    return (
        <View style={GlobalStyles.container}>
            <CustomHeader
                title={AppStrings.customer_ledger}
                icon={Icons.BACKICON}
                onPress={() => {
                    navigation.goBack()
                }}
            />
            <ScrollView>
                <CustomContainer>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_payment_model_placeholder.panels}</Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={AppStrings.add_payment_model_placeholder.select_panel}
                                data={[]}
                                value={''}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    // setFieldValue("group", item.value);
                                }}
                                borderStyle={Styles.dropDownContainerStyle}
                            />
                        </View>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.start_date}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpenStartDatePicker(true)
                                }}
                                activeOpacity={1}
                                style={Styles.datePickerBtnContainer}>

                                <View style={[Styles.textInputRowContainer, Styles.datePickerRowContainer]}>
                                    <Text style={Styles.datePickerTextStyle}>{moment(startDate).format('DD-MM-YYYY')}</Text>
                                    <Image source={Icons.DATEPICKERICONS} style={GlobalStyles.commonIconStyle} />
                                </View>
                                <DatePicker
                                    modal
                                    open={openStartDatePicker}
                                    date={startDate}
                                    androidVariant='iosClone'
                                    mode='date'
                                    onConfirm={(date) => {
                                        setOpenStartDatePicker(false)
                                        setStartDate(date)
                                    }}
                                    onCancel={() => {
                                        setOpenStartDatePicker(false)
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.end_date}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpenEndDatePicker(true)
                                }}
                                activeOpacity={1}
                                style={Styles.datePickerBtnContainer}>

                                <View style={[Styles.textInputRowContainer, { flex: 1, alignItems: 'center', paddingHorizontal: wp(3) }]}>
                                    <Text style={Styles.datePickerTextStyle}>{moment(endDate).format('DD-MM-YYYY')}</Text>
                                    <Image source={Icons.DATEPICKERICONS} style={GlobalStyles.commonIconStyle} />
                                </View>
                                <DatePicker
                                    modal
                                    open={openEndDatePicker}
                                    date={endDate}
                                    androidVariant='iosClone'
                                    mode='date'
                                    onConfirm={(date) => {
                                        setOpenEndDatePicker(false)
                                        setEndDate(date)
                                    }}
                                    onCancel={() => {
                                        setOpenEndDatePicker(false)
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <CustomPrimaryButton title={"Search"} onPress={() => { }} style={Styles.rowButtonContainerStyles} />
                        <CustomPrimaryButton title={"Reset"}
                            onPress={() => { }}
                            style={[Styles.rowButtonContainerStyles, Styles.resetButtonStyle]}
                            txtStyle={Styles.resetBtnTextStyles}
                        />
                    </View>
                    <Text style={Styles.summaryTextStyle}>{AppStrings.summary}</Text>
                    <View style={[GlobalStyles.rowContainer, Styles.summyItemRowContainer]}>
                        <Text style={Styles.summayItemText}>{AppStrings.opening_gold}</Text>
                        <Text style={Styles.summayItemText}>{0}</Text>
                    </View>
                    <View style={Styles.itemSeperatorLine} />
                    <View style={[GlobalStyles.rowContainer, Styles.summyItemRowContainer]}>
                        <Text style={Styles.summayItemText}>{AppStrings.closing_gold}</Text>
                        <Text style={Styles.summayItemText}>{0}</Text>
                    </View>
                    <View style={Styles.itemSeperatorLine} />
                    <View style={[GlobalStyles.rowContainer, Styles.summyItemRowContainer]}>
                        <Text style={Styles.summayItemText}>{AppStrings.opening_balance}</Text>
                        <Text style={Styles.summayItemText}>{0}</Text>
                    </View>
                    <View style={Styles.itemSeperatorLine} />
                    <View style={[GlobalStyles.rowContainer, Styles.summyItemRowContainer]}>
                        <Text style={Styles.summayItemText}>{AppStrings.
                            closing_balance}</Text>
                        <Text style={Styles.summayItemText}>{0}</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={Styles.spacerContainer}>
                            <Table borderStyle={Styles.tableStyle}>
                                <Row data={saleMasterTableHeader} widthArr={saleMasterTableWidth} style={Styles.headerRow} textStyle={Styles.headerText} />
                                {customerLedgerTableData.map((rowData, rowIndex) => (
                                    <Row key={rowIndex} data={rowData.map((cellData, cellIndex) => {
                                        return (
                                            <Text>{cellData}</Text>
                                        )
                                    })}
                                        widthArr={saleMasterTableWidth}
                                        style={Styles.dataRow} textStyle={Styles.tableRowTextStyle} />
                                ))}
                            </Table>
                        </View>
                    </ScrollView>
                    <View style={[GlobalStyles.rowContainer]}>
                        <CustomPrimaryButton title={"Column Visibility"} onPress={() => { }} style={[Styles.rowButtonContainerStyles, Styles.bottomRowBtnContainerStyle]} txtStyle={{ fontSize: FontSizes.FONT_SIZE_11 }} />
                        <CustomPrimaryButton title={"Export PDF"} onPress={() => { }} style={[Styles.rowButtonContainerStyles, Styles.bottomRowBtnContainerStyle]} txtStyle={{ fontSize: FontSizes.FONT_SIZE_11 }} />
                        <CustomPrimaryButton title={"Export Exel"} onPress={() => { }} style={[Styles.rowButtonContainerStyles, Styles.bottomRowBtnContainerStyle]} txtStyle={{ fontSize: FontSizes.FONT_SIZE_11 }} />
                    </View>
                </CustomContainer>
            </ScrollView>
        </View >
    )
}

export default CustomerLedgerScreen

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice)

    return StyleSheet.create({
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
        textInputContainerStyle: {
            width: wp(35)
        },
        dropDownContainerStyle: {
            width: wp(43),
            borderRadius: wp(2)
        },
        bottomBtnContainer: {
            flex: 1
        },
        textInputRowContainer: {
            flexDirection: 'row',
            justifyContent: "space-between"
        },
        datePickerBtnContainer: {
            width: wp(43),
            height: wp(10.3),
            borderRadius: wp(1),
            borderWidth: wp(0.3),
            borderColor: colors.BOX_BORDER,
            backgroundColor: colors.PRIMARY_BACKGROUND
        },
        datePickerTextStyle: {
            fontSize: FontSizes.FONT_SIZE_14,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_REGULAR,
            color: colors.PRIMARY_TEXT,
        },
        datePickerRowContainer: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: wp(3)
        },
        summaryTextStyle: {
            fontSize: FontSizes.FONT_SIZE_20,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            color: colors.PRIMARY_TEXT,
            marginVertical: wp(4)
        },
        summayItemText: {
            fontSize: FontSizes.FONT_SIZE_15,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            color: colors.PRIMARY_TEXT,
        },
        itemSeperatorLine: {
            width: "100%",
            height: hp(0.1),
            alignSelf: "center",
            marginVertical: wp(3),
            backgroundColor: colors.ITEM_SEPRATOR_COLOR,
        },
        summyItemRowContainer: {
            justifyContent: 'space-between'
        },
        rowButtonContainerStyles: {
            width: wp(20),
            paddingVertical: wp(2.5),
            borderRadius: wp(2),
            alignSelf: 'center',
            marginTop: wp(10),
            borderWidth: wp(0.3),
            borderColor: colors.TRANSPARENT
        },
        resetButtonStyle: {
            backgroundColor: colors.TRANSPARENT,
            borderColor: colors.BOX_DARK_BORDER
        },
        resetBtnTextStyles: {
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            fontSize: FontSizes.FONT_SIZE_14,
            color: colors.SECONDARY_TEXT,
        },
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
            marginTop: wp(7)
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
        bottomRowBtnContainerStyle: { flex: 1, marginRight: wp(2) }
    })
}