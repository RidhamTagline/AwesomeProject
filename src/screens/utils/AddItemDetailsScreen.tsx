import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalStyles } from '../../hooks/useGlobalStyles';
import CustomTextInput from '../../components/CustomTextInput';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { Fonts } from '../../styles/Fonts';
import { FontSizes } from '../../styles/FontSizes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icons } from '../../utils/IconsPaths';
import { DropDownListProps, itemType } from '../../utils/Constats';
import { AppStrings } from '../../utils/AppStrings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../../components/CustomHeader';
import * as  yup from 'yup';
import { useFormik } from 'formik';
import CommonErrorText from '../../components/CommonErrorText';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import CommonDropDownComponent from '../../components/CustomDropdownFeild';
import { RootStackParamList } from '../../types/RootStackType';
import { RouteProp, useRoute } from '@react-navigation/native';
import CustomContainer from '../../components/CustomContainer';
import CustomBottomBtn from '../../components/CustomBottomBtn';
import { ItemDetailsProps, updateItemDetailsReducer } from '../../redux/slice/paymentSlice/PaymentSlice';


const saleFieldSchema = yup.object().shape({
    name: yup.string().trim().required(),
    type: yup.string().trim().required(),
});

const AddItemDetailsScreen = () => {

    const Styles = useStyles();
    const GlobalStyles = useGlobalStyles();
    const navigation = useCustomNavigation('AddSaleItemScreen');
    const dispatch = useAppDispatch();
    const route = useRoute<NestedScreenRouteProp>();

    const { ItemDetailsData } = useAppSelector(state => state.PaymentSlice)

    type NestedScreenRouteProp = RouteProp<RootStackParamList, 'AddItemDetailsScreen'>;
    const { itemId, itemName } = route?.params;

    const [currentData, setCurrentData] = useState<ItemDetailsProps | undefined>();

    useEffect(() => {
        const itemData = ItemDetailsData.find(item => item.id == itemId)
        setCurrentData(itemData)
    }, [itemId]);

    const {
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
        },
        enableReinitialize: true,
        validationSchema: saleFieldSchema,
        onSubmit: (values) => {
            const { name, type, } = values;
            const data = {
                id: itemId,
                itemName: name,
                type: type,
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