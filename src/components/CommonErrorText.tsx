import React, { memo } from 'react';
import { Fonts } from '../styles/Fonts';
import { useAppSelector } from '../redux/Store';
import { FontSizes } from '../styles/FontSizes';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface CommonErrorTextProps {
    title: string,
};

const CommonErrorText = (props: CommonErrorTextProps & TextStyle) => {

    const Styles = useStyles();

    return (
        <Text {...props} style={Styles.errorTxtStyle}>{props.title}</Text>
    );
};

export default memo(CommonErrorText);

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice);

    return (
        StyleSheet.create({
            errorTxtStyle: {
                color: colors.ERROR_TEXT,
                fontFamily: Fonts.FONT_SORCE_SANS_PRO_REGULAR,
                fontSize: FontSizes.FONT_SIZE_12,
                alignSelf: 'flex-start'
            },
        })
    );
};
