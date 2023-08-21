import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Store'
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
import useCustomNavigation from '../../hooks/useCustomNavigation';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import { signIn } from '../../redux/slice/authSlice/AuthSlice';

const authenticationFieldSchema = yup.object().shape({
    userName: yup.string().trim().required(AppStrings.please_input_your_email),
    passWord: yup.string().trim().required(AppStrings.please_input_your_password),
});

const SignInScreen = () => {

    const Styles = useStyles();
    const GlobalStyles = useGlobalStyles();
    const { colors } = useAppSelector((state) => state.CommonSlice);
    const navigation = useCustomNavigation('AuthStack');
    const { isLoading } = useAppSelector(state => state.AuthSlice);
    const dispatch = useAppDispatch();

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
            const data = new FormData();
            data.append("fullname", values.userName)
            data.append("password", values.passWord)
            dispatch(signIn(data)).unwrap()
                .then(res => {
                    navigation.reset({
                        index: 0,
                        routes: [{
                            name: 'DrawerStack'
                        }]
                    });
                }).catch(e => { })
        }
    });

    return (
        <SafeAreaView style={GlobalStyles.container}>
            {isLoading ? <CustomActivityIndicator /> : null}
            <View style={[GlobalStyles.centerContainer, { paddingHorizontal: wp(5), flex: 1 }]}>
                <Text style={Styles.mainTitleTextStyle}>{AppStrings.signin}</Text>
                <Text style={Styles.textInputLablePreFixTextStyle}>*&nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.username}</Text></Text>
                <CustomTextInput
                    placeholder={AppStrings.username}
                    value={values.userName}
                    onChangeText={handleChange('userName')}
                    textInputContainerStyle={{ borderColor: (touched.userName && errors.userName) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                    autoCapitalize='none'
                />
                {(touched.userName && errors.userName) ? <CommonErrorText title={errors.userName} /> : null}
                <Text style={Styles.textInputLablePreFixTextStyle}>* &nbsp;<Text style={Styles.textInputLabelText}>{AppStrings.password}</Text></Text>
                <CustomTextInput
                    placeholder={AppStrings.password}
                    value={values.passWord}
                    onChangeText={handleChange('passWord')}
                    textInputContainerStyle={{ borderColor: (touched.passWord && errors.passWord) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                    autoCapitalize='none'
                />
                {(touched.passWord && errors.passWord) ? <CommonErrorText title={errors.passWord} /> : null}
                <CustomPrimaryButton
                    title={AppStrings.login}
                    style={Styles.bottomBtnContainer}
                    onPress={() => {
                        handleSubmit()
                    }}
                />
                <TouchableOpacity
                    style={Styles.newUserBtnContainer}
                    onPress={() => {
                        navigation.navigate('AuthStack', { screen: 'VerifyUserScreen' })
                    }}
                >
                    <Text style={Styles.newUserBtnText}>{AppStrings.newuser}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignInScreen

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
