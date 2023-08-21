import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalStyles } from '../../hooks/useGlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import { AppStrings } from '../../utils/AppStrings';
import { Icons } from '../../utils/IconsPaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import CustomContainer from '../../components/CustomContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { Fonts } from '../../styles/Fonts';
import { FontSizes } from '../../styles/FontSizes';
import CustomTextInput from '../../components/CustomTextInput';
import CommonDropDownComponent from '../../components/CustomDropdownFeild';
import { DropDownListProps, customerGroup, radioBtnconstant } from '../../utils/Constats';
import CustomCheckBox from '../../components/CustomCheckBox';
import CustomBottomBtn from '../../components/CustomBottomBtn';
import * as  yup from 'yup';
import { useFormik } from 'formik';
import CommonErrorText from '../../components/CommonErrorText';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { createAccount, getAllGroupsList } from '../../redux/slice/accountSlice/AccountSlice';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import { useIsFocused } from '@react-navigation/native';

const addAccontSchema = yup.object().shape({
    name: yup.string().trim().required(AppStrings.addAccountErrorMessage.please_enter_shop_name),
    group: yup.string().trim().required(AppStrings.addAccountErrorMessage.please_select_your_group),
    contactNo: yup.string().trim().required(AppStrings.addAccountErrorMessage.please_input_your_contact_no),
    alternateContact: yup.string().trim(),
    dateOfBirth: yup.string().trim(),
    address: yup.string().trim().required(AppStrings.addAccountErrorMessage.please_give_your_address),
    goldFine: yup.number(),
    silverFine: yup.number(),
    amount: yup.number(),
});

const AddAccountScreen = () => {

    const Styles = useStyles();
    const GlobalStyles = useGlobalStyles();
    const navigation = useCustomNavigation('AddAccountScreen');
    const { colors } = useAppSelector(state => state.CommonSlice)
    const [goldRadioBtn, setGoldRadioBtn] = useState<string>();
    const [silverRadioBtn, setSilveGoldRadioBtn] = useState<string>();
    const [amountRadioBtn, setAmountRadioBtn] = useState<string>();
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
    const [groupList, setgroupList] = useState<DropDownListProps[]>()
    const dob = new Date();
    const year = dob.getFullYear();
    const month = dob.getMonth();
    const day = dob.getDate();
    const [date, setDate] = useState(new Date(year - 18, month, day));
    const dispatch = useAppDispatch();
    const { isLoading, groupListData } = useAppSelector(state => state.AccountSlice);
    const focus = useIsFocused()
    // const [date, setDate] = useState(new Date());


    useEffect(() => {
        if (focus) {
            dispatch(getAllGroupsList(null)).unwrap().then(res => { }).catch(e => { })
        }
    }, [focus]);

    useEffect(() => {
        if (groupListData) {
            const data = groupListData?.results?.map(item => ({
                id: item.id,
                label: item.name,
                value: item.name,
            }));
            setgroupList(data);
        }
    }, [groupListData]);


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
            group: '',
            contactNo: '',
            alternateContact: '',
            dateOfBirth: '',
            address: '',
            goldFine: '',
            silverFine: '',
            amount: '',
        },
        enableReinitialize: true,
        validationSchema: addAccontSchema,
        onSubmit: (values) => {
            const { address, alternateContact, amount, contactNo, goldFine, name, silverFine, group } = values
            const data = {
                address: address,
                alternate_contact: Number(alternateContact),
                contactno: Number(contactNo),
                dob: moment(date).format('YYYY-MM-DD'),
                gold_fine_amount: goldFine,
                gold_fine_choice: goldRadioBtn ?? null,
                group_name: Number(group),
                name: name,
                opening_balance_total_amount: amount,
                opening_balance_total_amount_choice: amountRadioBtn ?? null,
                silver_fine_amount: silverFine,
                silver_fine_choice: silverRadioBtn ?? null,
            }
            dispatch(createAccount(data)).unwrap().then(res => {
                navigation.navigate('DrawerStack', { screen: 'SaleScreen' })
            }).catch(e => { })
        }
    });

    return (
        <View style={GlobalStyles.container}>
            {isLoading ? <CustomActivityIndicator /> : null}
            <CustomHeader
                title={AppStrings.add_account}
                icon={Icons.BACKICON}
                onPress={() => {
                    navigation.goBack()
                }}
            />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                bounces={false}
                keyboardShouldPersistTaps={'handled'}
                extraScrollHeight={Platform.OS == 'android' ? hp(10) : hp(5)}
            >
                <CustomContainer>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={Styles.textInputLablePreFixTextStyle}>*&nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.group}</Text></Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={AppStrings.add_item_modal_placeHolder.select_group}
                                data={groupList ?? []}
                                value={values.group}
                                rightIconvisible
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("group", item.id);
                                }}
                                borderStyle={[Styles.dropDownContainerStyle,
                                {
                                    borderWidth: wp(0.3), borderColor: (touched.
                                        group && errors.group) ? colors.ERROR_TEXT : colors.BOX_BORDER
                                }
                                ]}
                            />
                            {(touched.group && errors.group) ? <CommonErrorText title={errors.group} /> : null}
                        </View>
                        <View>
                            <Text style={Styles.textInputLablePreFixTextStyle}>*&nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.add_item_modal_placeHolder.name}</Text></Text>

                            <CustomTextInput
                                placeholder={AppStrings.add_item_modal_placeHolder.name}
                                value={values.name}
                                style={Styles.textInputContainerStyle}
                                onChangeText={handleChange('name')}
                                textInputContainerStyle={{ borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER, }}
                            />
                            {(touched.name && errors.name) ? <CommonErrorText title={errors.name} /> : null}
                        </View>
                    </View>
                    <View style={Styles.textInputRowContainer}>
                        <View style={{ maxWidth: wp(45) }}>
                            <Text style={Styles.textInputLablePreFixTextStyle}>*&nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.contact_no}</Text></Text>
                            <CustomTextInput
                                placeholder={AppStrings.contact_no}
                                value={values.contactNo}
                                style={Styles.textInputContainerStyle}
                                onChangeText={handleChange('contactNo')}
                                textInputContainerStyle={{ borderColor: (touched.contactNo && errors.contactNo) ? colors.ERROR_TEXT : colors.BOX_BORDER, }}
                            />
                            {(touched.contactNo && errors.contactNo) ? <CommonErrorText title={errors.contactNo} /> : null}
                        </View>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.alternate_contact_no}</Text>
                            <CustomTextInput
                                placeholder={AppStrings.add_item_modal_placeHolder.itemName}
                                value={values.alternateContact}
                                style={Styles.textInputContainerStyle}
                                onChangeText={handleChange('alternateContact')}
                            />
                        </View>
                    </View>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.date_of_birth}</Text>
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
                                        minimumDate={new Date(year - 70, month, day)}
                                        maximumDate={new Date(year - 18, month, day)}
                                        onConfirm={(date) => {
                                            setOpenDatePicker(false)
                                            setDate(date)

                                        }}
                                        onCancel={() => {
                                            setOpenDatePicker(false)
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.address}</Text>
                    <CustomTextInput
                        placeholder={AppStrings.enter_your_address}
                        multiline
                        style={{}}
                        textInputContainerStyle={{
                            borderColor: (touched.address && errors.address) ? colors.ERROR_TEXT : colors.BOX_BORDER,
                            alignItems: 'flex-start',
                            maxHeight: wp(20),
                            minHeight: wp(20),
                        }}
                        onChangeText={handleChange('address')}
                        value={values.address}
                        returnKeyType='done'
                        blurOnSubmit={true}
                    />
                    {(touched.address && errors.address) ? <CommonErrorText title={errors.address} /> : null}
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
            </KeyboardAwareScrollView>
            <CustomBottomBtn
                style={Styles.bottomBtnContainer}
                positiveTitle='Save'
                nagativeTitle='Cancel'
                onNagativePress={() => { resetForm() }}
                onPositivePress={() => { handleSubmit() }}
            />
        </View>
    )
}

export default AddAccountScreen

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
        textInputRowContainer: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: "space-between"
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
        multiLineTextInputContainer: {
            alignItems: 'flex-start',
            maxHeight: wp(20),
            minHeight: wp(20)
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
        }
    })
}