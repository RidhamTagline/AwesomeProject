import React, { memo } from 'react';
import { Fonts } from '../styles/Fonts';
import { useAppSelector } from '../redux/Store';
import { FontSizes } from '../styles/FontSizes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Platform, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

interface CustomTextInputProps {
    textInputLeftComponent?: React.ReactNode,
    textInputRightComponent?: React.ReactNode,
    textInputContainerStyle?: ViewStyle
    inputTextTitle?: string,
    titleTxtStyle?: TextStyle,
};

const CustomTextInput = (props: CustomTextInputProps & TextInputProps) => {

    const Styles = useStyles();
    const { colors } = useAppSelector(state => state.CommonSlice);

    return (
        <View style={[Styles.textInputMainContainerStyle, props.textInputContainerStyle, !props.style ? { flexDirection: 'row', alignItems: 'center', } : undefined]}>
            {props.textInputLeftComponent}
            <TextInput
                {...props}
                placeholderTextColor={colors.SECONDARY_TEXT}
                style={[Styles.textInputContainerStyle, props.style]}
            />
            {props.textInputRightComponent}
        </View>
    );
};

export default memo(CustomTextInput);

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice);

    return (
        StyleSheet.create({
            textInputMainContainerStyle: {
                // flexDirection: 'row',
                // alignItems: 'center',
                borderWidth: wp(0.3),
                paddingHorizontal: wp(4),
                borderRadius: wp(2),
                borderColor: colors.BOX_BORDER,
            },
            textInputContainerStyle: {
                flex: 1,
                fontSize: FontSizes.FONT_SIZE_14,
                fontFamily: Fonts.FONT_SORCE_SANS_PRO_REGULAR,
                color: colors.PRIMARY_TEXT,
                paddingVertical: wp(1.8),
            },
        })
    );
};
