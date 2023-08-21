import { FlatList, Image, Keyboard, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalStyles } from '../../hooks/useGlobalStyles';
import CustomTextInput from '../../components/CustomTextInput';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { Fonts } from '../../styles/Fonts';
import { FontSizes } from '../../styles/FontSizes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icons } from '../../utils/IconsPaths';
import CustomDropdownFeild from '../../components/CustomDropdownFeild';
import { DropDownListProps, LabourUnits, category, radioBtnconstant, stockMethod, units } from '../../utils/Constats';
import { AppStrings } from '../../utils/AppStrings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../../components/CustomHeader';
import * as  yup from 'yup';
import { useFormik } from 'formik';
import CommonErrorText from '../../components/CommonErrorText';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import CustomCheckBox from '../../components/CustomCheckBox';
import CommonDropDownComponent from '../../components/CustomDropdownFeild';
import { AuthStackParamList, RootStackParamList } from '../../types/RootStackType';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import CustomContainer from '../../components/CustomContainer';
import CustomBottomBtn from '../../components/CustomBottomBtn';
import { ItemGroupListData, createItem } from '../../redux/slice/saleSlice/SaleSlice';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

const saleFieldSchema = yup.object().shape({
    name: yup.string().trim().required(AppStrings.error_constants.please_enter_group_name),
    group: yup.object({
        label: yup.string().trim().required(AppStrings.error_constants.item_group),
        id: yup.number().required(),
    }),
    prefix: yup.string().trim().required(AppStrings.error_constants.please_enter_input_prefix),
    unit: yup.string().trim().required(AppStrings.error_constants.please_select_unit),
    labour: yup.string().trim().required(AppStrings.error_constants.please_select_labour_upon),
    stockMethod: yup.string().trim().required(AppStrings.error_constants.please_select_stock_method),
    individualPrice: yup.number(),
    goldFine: yup.number(),
    silverFine: yup.number(),
    amount: yup.number(),
});



const AddSaleItemScreen = () => {

    const Styles = useStyles();
    const GlobalStyles = useGlobalStyles();
    const { colors } = useAppSelector(state => state.CommonSlice);
    const navigation = useCustomNavigation('AddSaleItemScreen');
    const [goldRadioBtn, setGoldRadioBtn] = useState<string>();
    const [silverRadioBtn, setSilveGoldRadioBtn] = useState<string>();
    const [amountRadioBtn, setAmountRadioBtn] = useState<string>();
    const { isLoading, itemGroupListData } = useAppSelector(state => state.SaleSlice)
    const dispatch = useAppDispatch();
    type NestedScreenRouteProp = RouteProp<RootStackParamList, 'AddSaleItemScreen'>;
    const { params } = useRoute<NestedScreenRouteProp>();
    const focus = useIsFocused();
    const [itemGroupdata, setItemGroupdata] = useState<DropDownListProps[]>();

    useEffect(() => {
        if (focus) {
            dispatch(ItemGroupListData(null)).unwrap().then(res => { }).catch(e => { })
        }
    }, [focus]);


    useEffect(() => {
        if (itemGroupListData) {
            const data = itemGroupListData?.results?.map(item => ({
                id: item.id,
                label: item.name,
                value: item.name,
            }));
            setItemGroupdata(data);
        }
    }, [itemGroupListData]);


    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        resetForm,
        setFieldValue
    } = useFormik({
        initialValues: {
            name: '',
            group: {
                label: "",
                id: undefined
            },
            prefix: '',
            unit: '',
            labour: '',
            stockMethod: '',
            individualPrice: "",
            goldFine: "",
            silverFine: "",
            amount: ""
        },
        enableReinitialize: true,
        validationSchema: saleFieldSchema,
        onSubmit: (values) => {
            const { amount, goldFine, individualPrice, name, labour, prefix, silverFine, stockMethod, unit, group } = values;
            const saleItem = {
                gold_fine_amount: goldFine ?? 0,
                gold_fine_choice: goldRadioBtn ?? null,
                group_id: group.id,
                item_prefix_code: prefix,
                labour_upon: labour,
                name: name,
                opening_balance_total_amount: amount ?? 0,
                opening_balance_total_amount_choice: amountRadioBtn ?? null,
                price: individualPrice,
                silver_fine_amount: silverFine ?? 0,
                silver_fine_choice: silverRadioBtn ?? null,
                stock_method: stockMethod,
                units: unit,
            }
            if (saleItem && saleItem.group_id) {
                dispatch(createItem(saleItem)).unwrap().then(res => {
                    navigation.goBack()
                })
                    .catch(e => {
                        console.log("🚀 ~ file: AddSaleItemScreen.tsx:127 ~ AddSaleItemScreen ~ e:", e)
                    })
            }
        }
    });

    return (
        <View style={GlobalStyles.container}>
            {isLoading ? <CustomActivityIndicator /> : null}
            <CustomHeader
                title={AppStrings.add_item}
                icon={Icons.BACKICON}
                onPress={() => {
                    navigation.goBack()
                }}
            />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                scrollEnabled={false}
                keyboardShouldPersistTaps={'handled'}
                extraScrollHeight={Platform.OS == 'android' ? hp(10) : hp(0)}
            >
                <CustomContainer>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={Styles.textInputLablePreFixTextStyle}>*&nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.add_item_modal_placeHolder.name}</Text></Text>
                            <CustomTextInput
                                placeholder={AppStrings.add_item_modal_placeHolder.itemName}
                                value={values.name}
                                style={Styles.textInputContainerStyle}
                                onChangeText={handleChange('name')}
                                textInputContainerStyle={{ borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER, }}
                            />
                            {(touched.name && errors.name) ? <CommonErrorText title={errors.name} /> : null}
                        </View>
                        <View>
                            <Text style={Styles.textInputLablePreFixTextStyle}>*&nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.add_item_modal_placeHolder.group}</Text></Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={AppStrings.add_item_modal_placeHolder.select_group}
                                data={itemGroupdata ?? []}
                                value={values.group.label}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("group", item);
                                }}
                                borderStyle={[Styles.dropDownContainerStyle, { borderWidth: wp(0.3), borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER }]}
                            />
                            {(errors?.group?.label && touched?.group?.label) ? <CommonErrorText title={errors?.group?.label} /> : null}
                        </View>
                    </View>

                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={Styles.textInputLablePreFixTextStyle}>*&nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.add_item_modal_placeHolder.name}</Text></Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={AppStrings.add_item_modal_placeHolder.item_prefix}
                                value={values.prefix}
                                onChangeText={handleChange('prefix')}
                                textInputContainerStyle={{ borderColor: (touched.prefix && errors.prefix) ? colors.ERROR_TEXT : colors.BOX_BORDER, }}
                            />
                            {(touched.prefix && errors.prefix) ? <CommonErrorText title={errors.prefix} /> : null}

                        </View>
                        <View>
                            <Text style={Styles.textInputLablePreFixTextStyle}>*&nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.add_item_modal_placeHolder.unit}</Text></Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={AppStrings.add_item_modal_placeHolder.unit}
                                data={units}
                                value={values.unit}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("unit", item.value);
                                }}
                                borderStyle={[Styles.dropDownContainerStyle, { borderColor: (touched.unit && errors.unit) ? colors.ERROR_TEXT : colors.BOX_BORDER }]}
                            />
                            {(touched.unit && errors.unit) ? <CommonErrorText title={errors.unit} /> : null}
                        </View>
                    </View>


                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={Styles.textInputLablePreFixTextStyle}>*&nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.add_item_modal_placeHolder.labour_upon}</Text></Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={AppStrings.add_item_modal_placeHolder.select_labour_upon}
                                data={LabourUnits}
                                value={values.labour}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("labour", item.value);
                                }}

                                borderStyle={[Styles.dropDownContainerStyle, { borderColor: (touched.labour && errors.labour) ? colors.ERROR_TEXT : colors.BOX_BORDER }]}
                            />
                            {(touched.labour && errors.labour) ? <CommonErrorText title={errors.labour} /> : null}
                        </View>
                        <View>
                            <Text style={Styles.textInputLablePreFixTextStyle}>*&nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.add_item_modal_placeHolder.stock_method}</Text></Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={AppStrings.add_item_modal_placeHolder.select_stock_method}
                                data={stockMethod}
                                value={values.stockMethod}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("stockMethod", item.value);
                                }}
                                borderStyle={[Styles.dropDownContainerStyle, { borderColor: (touched.stockMethod && errors.stockMethod) ? colors.ERROR_TEXT : colors.BOX_BORDER }]}
                            />
                            {(touched.stockMethod && errors.stockMethod) ? <CommonErrorText title={errors.stockMethod} /> : null}
                        </View>
                    </View>

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_item_modal_placeHolder.induvidual_price}</Text>
                    <CustomTextInput
                        placeholder={AppStrings.add_item_modal_placeHolder.item_price}
                        keyboardType='number-pad'
                        value={values.individualPrice.toString()}
                        onChangeText={handleChange('individualPrice')}
                    />

                    <Text style={Styles.openingBalanceText}>{AppStrings.opening_balance_amount}</Text>

                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.gold_fine}</Text>
                            <View style={GlobalStyles.rowContainer}>
                                <View style={{ marginRight: wp(3) }}>
                                    <CustomTextInput
                                        placeholder={AppStrings.gold_fine}
                                        keyboardType='number-pad'
                                        style={{ width: wp(40) }}
                                        value={values.goldFine.toString()}
                                        onChangeText={handleChange('goldFine')}
                                    />
                                </View>
                                {
                                    radioBtnconstant.map(res => {
                                        return (
                                            <CustomCheckBox
                                                value={goldRadioBtn == res.id ? true : false}
                                                title={res.item}
                                                icon={Icons.SELECTED_RADIO_BUTTON_ICON}
                                                inActiveIconStyle={Styles.inActiveCheckBoxIcon}
                                                titleStyle={Styles.textInputLabelText}
                                                activeIconStyle={{ tintColor: colors.PRIMARY_ICON }}
                                                onPress={() => {
                                                    setGoldRadioBtn(res.id)
                                                }}
                                            />
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>

                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.silver_fine}</Text>

                            <View style={GlobalStyles.rowContainer}>
                                <View style={{ marginRight: wp(3) }}>
                                    <CustomTextInput
                                        placeholder={AppStrings.silver_fine}
                                        keyboardType='number-pad'
                                        style={{ width: wp(40) }}
                                        value={values.silverFine.toString()}
                                        onChangeText={handleChange('silverFine')}
                                    />
                                </View>
                                {
                                    radioBtnconstant.map(res => {
                                        return (
                                            <CustomCheckBox
                                                value={silverRadioBtn == res.id ? true : false}
                                                title={res.item}
                                                icon={Icons.SELECTED_RADIO_BUTTON_ICON}
                                                inActiveIconStyle={Styles.inActiveCheckBoxIcon}
                                                titleStyle={Styles.textInputLabelText}
                                                activeIconStyle={{ tintColor: colors.PRIMARY_ICON }}
                                                onPress={() => {
                                                    setSilveGoldRadioBtn(res.id)
                                                }}
                                            />
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.amount}</Text>
                            <View style={GlobalStyles.rowContainer}>
                                <View style={{ marginRight: wp(3) }}>
                                    <CustomTextInput
                                        placeholder={AppStrings.amount}
                                        keyboardType='number-pad'
                                        style={{ width: wp(40) }}
                                        value={values.amount.toString()}
                                        onChangeText={handleChange('amount')}
                                    />
                                </View>
                                {
                                    radioBtnconstant.map(res => {
                                        return (
                                            <CustomCheckBox
                                                value={amountRadioBtn == res.id ? true : false}
                                                title={res.item}
                                                icon={Icons.SELECTED_RADIO_BUTTON_ICON}
                                                inActiveIconStyle={Styles.inActiveCheckBoxIcon}
                                                titleStyle={Styles.textInputLabelText}
                                                activeIconStyle={{ tintColor: colors.PRIMARY_ICON }}
                                                onPress={() => {
                                                    setAmountRadioBtn(res.id)
                                                }}
                                            />
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </CustomContainer>
            </KeyboardAwareScrollView >
            <CustomBottomBtn
                style={Styles.bottomBtnContainer}
                positiveTitle='Save'
                nagativeTitle='Cancel'
                onNagativePress={() => {
                    resetForm()
                    navigation.goBack()
                }}
                onPositivePress={() => {
                    handleSubmit()
                }}
            />
        </View>
    )
}
export default AddSaleItemScreen;

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
        openingBalanceText: {
            color: colors.PRIMARY_TEXT,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_BOLD,
            fontSize: FontSizes.FONT_SIZE_16,
            marginTop: wp(5)
        },
        inActiveCheckBoxIcon: {
            borderRadius: wp(10),
            borderColor: colors.BOX_DARK_BORDER
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
            flex: 1,
            justifyContent: "space-between"
        }
    })
}