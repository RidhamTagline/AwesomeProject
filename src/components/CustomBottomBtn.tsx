import React, { memo } from 'react';
import { StyleSheet, TextStyle, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { useGlobalStyles } from '../hooks/useGlobalStyles';
import CustomPrimaryButton, { CustomPrimaryButtonProps } from './CustomPrimaryButton';
import { useAppSelector } from '../redux/Store';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Fonts } from '../styles/Fonts';
import { FontSizes } from '../styles/FontSizes';

interface CustomBottomBtnProps {
    containerStyle?: ViewStyle,
    positiveTitle: string,
    nagativeTitle: string,
    onPositivePress: () => void,
    onNagativePress: () => void,
    txtStyle?: TextStyle
};

const CustomBottomBtn = (props: CustomBottomBtnProps & TouchableOpacityProps) => {

    const GlobalStyle = useGlobalStyles();
    const Styles = useStyles();

    return (
        <View style={[GlobalStyle.bottomBtnContainerStyle, GlobalStyle.rowContainer, props.containerStyle]}>
            <CustomPrimaryButton
                {...props}
                title={props.nagativeTitle}
                style={[GlobalStyle.bottomBtnStyle, Styles.nagativeBtnStyle, props.style]}
                txtStyle={[Styles.nagativeBtnTitleTextStyle]}
                onPress={props.onNagativePress}
            />
            <CustomPrimaryButton
                {...props}
                title={props.positiveTitle}
                style={[GlobalStyle.bottomBtnStyle, Styles.positiveBtnStyle, props.style]}
                txtStyle={props.txtStyle}
                onPress={props.onPositivePress}
            />
        </View>
    );
};

export default memo(CustomBottomBtn);

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice)

    return (
        StyleSheet.create({
            nagativeBtnStyle: {
                backgroundColor: colors.PRIMARY_BACKGROUND,
                paddingVertical: wp(3),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: wp(2),
                borderWidth: wp(0.3),
                marginRight: wp(3),
                borderColor: colors.BOX_DARK_BORDER
            },
            nagativeBtnTitleTextStyle: {
                color: colors.SECONDARY_TEXT,
                fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
                fontSize: FontSizes.FONT_SIZE_14,
            },
            positiveBtnStyle: {
                borderWidth: wp(0.3),
                borderColor: colors.TRANSPARENT
            }
        })
    );
};
