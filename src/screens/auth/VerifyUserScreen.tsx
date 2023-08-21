import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../redux/Store'
import { useGlobalStyles } from '../../hooks/useGlobalStyles';
import * as  yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStrings } from '../../utils/AppStrings';
import { Fonts } from '../../styles/Fonts';
import { FontSizes } from '../../styles/FontSizes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomTextInput from '../../components/CustomTextInput';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import { useFormik } from 'formik';
import CommonErrorText from '../../components/CommonErrorText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useCustomNavigation from '../../hooks/useCustomNavigation';

const authenticationFieldSchema = yup.object().shape({
    userName: yup.string().trim().required(AppStrings.please_input_your_email),
});

const VerifyUserScreen = () => {

    const Styles = useStyles();
    const GlobalStyles = useGlobalStyles();
    const { colors } = useAppSelector((state) => state.CommonSlice);
    const navigation = useCustomNavigation('AuthStack')

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        resetForm
    } = useFormik({
        initialValues: { userName: '', passWord: '' },
        enableReinitialize: true,
        validationSchema: authenticationFieldSchema,
        onSubmit: (values) => {
            console.log("🚀 ~ file: SignInScreen.tsx:38 ~ SignInScreen ~ values:", values)

        }
    });

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <View style={[GlobalStyles.centerContainer, { paddingHorizontal: wp(5), flex: 1 }]}>
                <Text style={Styles.mainTitleTextStyle}>{AppStrings.verify_yourself}</Text>
                <Text style={Styles.textInputLablePreFixTextStyle}>*&nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.username}</Text></Text>
                <CustomTextInput
                    placeholder={AppStrings.username}
                    value={values.userName}
                    onChangeText={handleChange('userName')}
                    textInputContainerStyle={{ borderColor: (touched.userName && errors.userName) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                />
                {(touched.userName && errors.userName) ? <CommonErrorText title={errors.userName} /> : null}
                <CustomPrimaryButton
                    title={AppStrings.submit}
                    style={Styles.bottomBtnContainer}
                    onPress={() => {
                        handleSubmit()
                    }}
                />
                <TouchableOpacity
                    style={Styles.newUserBtnContainer}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={Styles.newUserBtnText}>{AppStrings.goback}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default VerifyUserScreen;

const useStyles = () => {

    const { colors } = useAppSelector((state) => state.CommonSlice);

    return StyleSheet.create({
        mainTitleTextStyle: {
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            color: colors.PRIMARY_TEXT,
            fontSize: FontSizes.FONT_SIZE_20,
            marginLeft: wp(4),
            borderRadius: wp(3),
        },
        textInputLablePreFixTextStyle: {
            color: colors.ERROR_TEXT,
            marginTop: wp(5),
            marginBottom: wp(3),
            alignSelf: 'flex-start'
        },
        textInputLabelText: {
            color: colors.PRIMARY_TEXT,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            fontSize: FontSizes.FONT_SIZE_14,
        },
        bottomBtnContainer: {
            marginTop: wp(5)
        },
        newUserBtnText: {
            alignSelf: 'center',
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            fontSize: FontSizes.FONT_SIZE_14,
            color: colors.PRIMARY_TEXT,

        },
        newUserBtnContainer: {
            marginTop: wp(10),
        }
    });
};
