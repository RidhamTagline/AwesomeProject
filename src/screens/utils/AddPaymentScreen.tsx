import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalStyles } from '../../hooks/useGlobalStyles';
import CustomTextInput from '../../components/CustomTextInput';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { Fonts } from '../../styles/Fonts';
import { FontSizes } from '../../styles/FontSizes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icons } from '../../utils/IconsPaths';
import { AppStrings } from '../../utils/AppStrings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../../components/CustomHeader';
import * as  yup from 'yup';
import { useFormik } from 'formik';
import CommonErrorText from '../../components/CommonErrorText';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import CommonDropDownComponent from '../../components/CustomDropdownFeild';
import CustomContainer from '../../components/CustomContainer';
import CustomBottomBtn from '../../components/CustomBottomBtn';
import { paymentDataProps, updatePaymentDetailsReducer } from '../../redux/slice/paymentSlice/PaymentSlice';
import { RootStackParamList } from '../../types/RootStackType';
import { RouteProp, useRoute } from '@react-navigation/native';

const saleFieldSchema = yup.object().shape({
    panels: yup.string().trim(),
    method: yup.string().trim(),
    grwt: yup.string().trim(),
    tunch: yup.string().trim(),
    total: yup.string().trim(),
});

const AddPaymentScreen = () => {

    const Styles = useStyles();
    const GlobalStyles = useGlobalStyles();
    const navigation = useCustomNavigation('AddSaleItemScreen');
    const dispatch = useAppDispatch();
    const { params } = useRoute<NestedScreenRouteProp>();

    const { paymentListData } = useAppSelector(state => state.PaymentSlice)
    type NestedScreenRouteProp = RouteProp<RootStackParamList, 'AddPaymentScreen'>;

    const [currentData, setCurrentData] = useState<paymentDataProps>()

    useEffect(() => {
        const data = paymentListData?.find(item => item?.id == params?.itemId)
        setCurrentData(data)
    }, [params]);

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
            panels: currentData?.panels ?? '',
            method: currentData?.method ?? '',
            grwt: currentData?.grwt ?? '',
            tunch: currentData?.tunch ?? '',
            total: currentData?.total ?? '',
        },
        enableReinitialize: true,
        validationSchema: saleFieldSchema,
        onSubmit: (values) => {
            const { grwt, method, panels, total, tunch } = values;
            const id = paymentListData?.length !== 0 ? paymentListData[paymentListData?.length - 1]?.id + 1 : 1
            const data = {
                id: params?.itemId ?? id,
                panels: panels,
                method: method,
                grwt: grwt,
                tunch: tunch,
                total: total,
            }
            dispatch(updatePaymentDetailsReducer(data))
            navigation.goBack()
        }
    });

    return (
        <View style={GlobalStyles.container}>
            <CustomHeader
                title={AppStrings.payment_details}
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
            // extraScrollHeight={Platform.OS == 'android' ? hp(10) : hp(8)}
            >
                <CustomContainer>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_payment_model_placeholder.panels}</Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={AppStrings.add_payment_model_placeholder.select_panel}
                                data={panelsType}
                                value={values.panels}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("panels", item.value);
                                }}
                                borderStyle={Styles.dropDownContainerStyle}
                            />
                            {(touched.panels && errors.panels) ? <CommonErrorText title={errors.panels} /> : null}
                        </View>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_payment_model_placeholder.method}</Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={""}
                                data={values?.panels == "Reciept" || values?.panels == "Payment" ? paymentsType : otherPaymentMethod}
                                value={values.method}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("method", item.value);
                                }}
                                borderStyle={Styles.dropDownContainerStyle}
                            />
                        </View>
                    </View>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_payment_model_placeholder.amt_gr_wt}</Text>
                            <CustomTextInput
                                placeholder={AppStrings.add_payment_model_placeholder.default_price}
                                style={Styles.textInputContainerStyle}
                                keyboardType='number-pad'
                                value={values.grwt}
                                onChangeText={handleChange('grwt')}
                            />
                        </View>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_payment_model_placeholder.tunch}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={AppStrings.add_payment_model_placeholder.default_price}
                                keyboardType='number-pad'
                                value={values.tunch}
                                onChangeText={handleChange('tunch')}
                            />
                        </View>
                    </View>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_payment_model_placeholder.Total}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={AppStrings.add_payment_model_placeholder.default_price}
                                keyboardType='number-pad'
                                value={values.total}
                                onChangeText={handleChange('total')}
                            />
                        </View>
                    </View>
                </CustomContainer>
            </KeyboardAwareScrollView >
            <CustomBottomBtn style={Styles.bottomBtnContainer}
                positiveTitle='Save'
                nagativeTitle='Cancel'
                onNagativePress={() => {
                    resetForm()
                    navigation.goBack()
                }}
                onPositivePress={() => { handleSubmit() }}
            />
        </View >
    )
}
export default AddPaymentScreen;

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
            flex: 1,
            justifyContent: "space-between"
        }
    })
}