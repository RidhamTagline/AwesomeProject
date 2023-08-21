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
import { DropDownListProps, LabourUnits, category, radioBtnconstant, stockMethod, units, paymentsType, panelsType, itemType, itemStamp } from '../../utils/Constats';
import { AppStrings } from '../../utils/AppStrings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../../components/CustomHeader';
import * as  yup from 'yup';
import { useFormik } from 'formik';
import CommonErrorText from '../../components/CommonErrorText';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import CustomCheckBox from '../../components/CustomCheckBox';
import CommonDropDownComponent from '../../components/CustomDropdownFeild';
import { RootStackParamList } from '../../types/RootStackType';
import { RouteProp, useRoute } from '@react-navigation/native';
import CustomContainer from '../../components/CustomContainer';
import CustomBottomBtn from '../../components/CustomBottomBtn';
import { ItemDetailsProps, updateItemDetailsReducer } from '../../redux/slice/paymentSlice/PaymentSlice';


const saleFieldSchema = yup.object().shape({
    name: yup.string().trim().required(),
    type: yup.string().trim().required(),
    grwt: yup.string().required(),
    netwt: yup.string().required(),
    fine: yup.string().required(),
    less: yup.string().required(),
    unit: yup.string().trim().required(AppStrings.error_constants.please_select_unit),
    stamp: yup.string().trim(),
    pc: yup.string(),
    tunch: yup.string(),
    wstg: yup.string(),
    rate: yup.string(),
    lbr: yup.string(),
    on: yup.string(),
    total: yup.string(),
});

const AddItemDetailsScreen = () => {

    const Styles = useStyles();
    const GlobalStyles = useGlobalStyles();
    const { colors } = useAppSelector(state => state.CommonSlice);
    const navigation = useCustomNavigation('AddSaleItemScreen');
    const dispatch = useAppDispatch();
    const { ItemDetailsData } = useAppSelector(state => state.PaymentSlice)
    type NestedScreenRouteProp = RouteProp<RootStackParamList, 'AddItemDetailsScreen'>;
    const route = useRoute<NestedScreenRouteProp>();
    const { itemId, itemName } = route?.params;
    const [currentData, setCurrentData] = useState<ItemDetailsProps | undefined>();

    useEffect(() => {
        const itemData = ItemDetailsData.find(item => item.id == itemId)
        setCurrentData(itemData)
    }, [itemId]);

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
            name: itemName ?? '',
            type: currentData?.type ?? '',
            grwt: currentData?.grwt ?? '',
            netwt: currentData?.netwt ?? '',
            fine: currentData?.fine ?? '',
            less: currentData?.less ?? "",
            unit: currentData?.unit ?? '',
            stamp: currentData?.stamp ?? '',
            pc: currentData?.pc ?? '',
            tunch: currentData?.tunch ?? '',
            wstg: currentData?.wstg ?? '',
            rate: currentData?.rate ?? '',
            lbr: currentData?.lbr ?? '',
            on: currentData?.on ?? '',
            total: currentData?.total ?? '',
        },
        enableReinitialize: true,
        validationSchema: saleFieldSchema,
        onSubmit: (values) => {
            const { name, type, grwt, netwt, fine, unit, stamp, pc, tunch, wstg, rate, lbr, on, total, less } = values;
            const data = {
                id: itemId,
                itemName: name,
                type: type,
                grwt: grwt,
                less: less,
                netwt: netwt,
                fine: fine,
                unit: unit,
                stamp: stamp,
                pc: pc,
                tunch: tunch,
                wstg: wstg,
                rate: rate,
                lbr: lbr,
                on: on,
                total: total
            }
            if (itemId && itemName) {
                dispatch(updateItemDetailsReducer(data))
                navigation.goBack();
            }
        }

    });

    return (
        <View style={GlobalStyles.container}>
            <CustomHeader
                title={AppStrings.itemDetails}
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
                extraScrollHeight={Platform.OS == 'android' ? hp(10) : hp(6)}
            >
                <CustomContainer>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.item_name}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={AppStrings.item_name}
                                keyboardType='number-pad'
                                value={itemName ?? values.name}
                                editable={false}
                            />
                            {(touched.name && errors.name) ? <CommonErrorText title={errors.name} /> : null}
                        </View>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Type"}</Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={"P"}
                                data={itemType}
                                value={values.type}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("type", item.value);
                                }}
                                borderStyle={Styles.dropDownContainerStyle}
                            // borderStyle={{ borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                            />
                            {(touched.type && errors.type) ? <CommonErrorText title={errors.type} /> : null}
                        </View>
                    </View>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.stamp}</Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={"25K"}
                                data={itemStamp}
                                value={values.stamp}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("stamp", item.value);
                                }}
                                borderStyle={Styles.dropDownContainerStyle}
                            // borderStyle={{ borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                            />
                            {(touched.stamp && errors.stamp) ? <CommonErrorText title={errors.stamp} /> : null}
                        </View>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_item_modal_placeHolder.unit}</Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={"Kg"}
                                data={units}
                                value={values.unit}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("unit", item.value);
                                }}
                                borderStyle={Styles.dropDownContainerStyle}
                            // borderStyle={{ borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                            />
                            {(touched.unit && errors.unit) ? <CommonErrorText title={errors.unit} /> : null}
                        </View>
                    </View>


                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Pc"}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={"2"}
                                keyboardType='number-pad'
                                value={values.pc}
                                onChangeText={handleChange('pc')}
                            />
                            {(touched.pc && errors.pc) ? <CommonErrorText title={errors.pc} /> : null}
                        </View>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_payment_model_placeholder.amt_gr_wt}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={AppStrings.add_payment_model_placeholder.default_price}
                                keyboardType='number-pad'
                                value={values.grwt}
                                onChangeText={handleChange('grwt')}
                            />
                            {(touched.grwt && errors.grwt) ? <CommonErrorText title={errors.grwt} /> : null}
                        </View>
                    </View>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Less"}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={AppStrings.add_payment_model_placeholder.zero_price}
                                keyboardType='number-pad'
                                value={values.less}
                                onChangeText={handleChange('less')}
                            />
                            {(touched.less && errors.less) ? <CommonErrorText title={errors.less} /> : null}
                        </View>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Net Wt"}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={AppStrings.add_payment_model_placeholder.zero_price}
                                keyboardType='number-pad'
                                value={values.netwt}
                                onChangeText={handleChange('netwt')}
                            />
                            {(touched.netwt && errors.netwt) ? <CommonErrorText title={errors.netwt} /> : null}
                        </View>
                    </View>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_payment_model_placeholder.tunch}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={AppStrings.add_payment_model_placeholder.zero_price}
                                keyboardType='number-pad'
                                value={values.tunch}
                                onChangeText={handleChange('tunch')}
                            />
                            {(touched.tunch && errors.tunch) ? <CommonErrorText title={errors.tunch} /> : null}
                        </View>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_payment_model_placeholder.wstg}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={AppStrings.add_payment_model_placeholder.zero_price}
                                keyboardType='number-pad'
                                value={values.wstg}
                                onChangeText={handleChange('wstg')}
                            />
                            {(touched.wstg && errors.wstg) ? <CommonErrorText title={errors.wstg} /> : null}
                        </View>
                    </View>

                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_payment_model_placeholder.rate}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={AppStrings.add_payment_model_placeholder.zero_price}
                                keyboardType='number-pad'
                                value={values.rate}
                                onChangeText={handleChange('rate')}
                            />
                            {(touched.rate && errors.rate) ? <CommonErrorText title={errors.rate} /> : null}
                        </View>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_payment_model_placeholder.lbr}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={AppStrings.add_payment_model_placeholder.zero_price}
                                keyboardType='number-pad'
                                value={values.lbr}
                                onChangeText={handleChange('lbr')}
                            />
                            {(touched.lbr && errors.lbr) ? <CommonErrorText title={errors.lbr} /> : null}
                        </View>
                    </View>
                    <View style={Styles.textInputRowContainer}>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"On"}</Text>
                            <CommonDropDownComponent
                                labelField="label"
                                valueField="value"
                                placeholder={"Pc"}
                                data={LabourUnits}
                                value={values.on}
                                rightIconvisible={true}
                                isVisibleRenderItem
                                onChange={(item: DropDownListProps) => {
                                    setFieldValue("on", item.value);
                                }}
                                borderStyle={Styles.dropDownContainerStyle}
                            // borderStyle={{ borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                            />
                            {(touched.on && errors.on) ? <CommonErrorText title={errors.on} /> : null}
                        </View>
                        <View>
                            <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Fine"}</Text>
                            <CustomTextInput
                                style={Styles.textInputContainerStyle}
                                placeholder={"0.00"}
                                keyboardType='number-pad'
                                value={values.fine}
                                onChangeText={handleChange('fine')}
                            />
                            {(touched.fine && errors.fine) ? <CommonErrorText title={errors.fine} /> : null}
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
                            {(touched.total && errors.total) ? <CommonErrorText title={errors.total} /> : null}
                        </View>
                    </View>

                </CustomContainer>
            </KeyboardAwareScrollView >
            <CustomBottomBtn style={Styles.bottomBtnContainer}
                positiveTitle='Save'
                nagativeTitle='Cancel'
                onNagativePress={() => { resetForm() }}
                onPositivePress={() => { handleSubmit() }}
            />
        </View >
    )
}
export default AddItemDetailsScreen;

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