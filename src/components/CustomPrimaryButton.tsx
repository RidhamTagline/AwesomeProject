import React, { memo } from 'react';
import { Fonts } from '../styles/Fonts';
import { useAppSelector } from '../redux/Store';
import { FontSizes } from '../styles/FontSizes';
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export interface CustomPrimaryButtonProps {
    txtStyle?: TextStyle,
    title: String
};

const CustomPrimaryButton = (props: CustomPrimaryButtonProps & TouchableOpacityProps) => {

    const Styles = useStyles();

    return (
        <TouchableOpacity {...props} style={[Styles.btnContainerStyle, props.style]}>
            <Text numberOfLines={1} style={[Styles.btnTitleStyle, props.txtStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default memo(CustomPrimaryButton);

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice);

    return (
        StyleSheet.create({
            btnTitleStyle: {
                fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
                fontSize: FontSizes.FONT_SIZE_14,
                color: colors.BUTTON_TEXT,
                alignSelf: 'center'
            },
            btnContainerStyle: {
                backgroundColor: colors.PRIMARY,
                paddingVertical: wp(2.5),
                borderRadius: wp(10),
                width: wp(90),
            }
        })
    );
};
