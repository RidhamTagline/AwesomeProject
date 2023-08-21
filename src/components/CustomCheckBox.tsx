import React, { memo } from 'react';
import { Image, ImageProps, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { useGlobalStyles } from '../hooks/useGlobalStyles';
import { useAppSelector } from '../redux/Store';
import { Icons } from '../utils/IconsPaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontSizes } from '../styles/FontSizes';

interface CustomCheckBoxProps {
    title: string;
    value: boolean;
    onClose?: () => void,
    closeContainerStyle?: ViewStyle,
    closeIconStyle?: ImageStyle,
    showCloseIcon?: boolean,
    titleStyle?: TextStyle,
    containerStyle?: ViewStyle,
    subTitle?: string,
    subTitleStyle?: TextStyle,
    inActiveIconStyle?: ViewStyle,
    activeIconStyle?: ImageStyle,
    icon?: ImageProps
};

const CustomCheckBox = (props: CustomCheckBoxProps & TouchableOpacityProps) => {

    const GlobalStyle = useGlobalStyles();
    const Styles = useStyles();
    const { colors } = useAppSelector(state => state.CommonSlice)

    return (
        <TouchableOpacity {...props} activeOpacity={1} style={[Styles.checkBoxContainerStyle, props.containerStyle]} >
            <View style={[GlobalStyle.rowContainer, Styles.containerStyle]}>
                {props.value ?
                    <Image source={props.icon ?? Icons.CHECKBOX} style={[Styles.activeIconStyle, props.activeIconStyle]} />
                    :
                    <View style={[Styles.inActiveIconStyle, props.inActiveIconStyle]} />
                }
                <Text numberOfLines={2} style={[GlobalStyle.subTitleStyle, Styles.titleStyle, props.titleStyle]}>{props.title}</Text>
                {props.subTitle ? <Text numberOfLines={2} style={[GlobalStyle.subTitleStyle, Styles.subTitleStyle, props.subTitleStyle]}>{props.subTitle}</Text> : null}
            </View>
            {/* {props.showCloseIcon ?
                <TouchableOpacity style={props.closeContainerStyle} onPress={props.onClose}>
                    <Image source={Icons.CLOSE_ICON} style={[Styles.closeIconStyle, props.closeIconStyle]} />
                </TouchableOpacity>
                :
                null} */}
        </TouchableOpacity>
    );
};

export default memo(CustomCheckBox);

const useStyles = () => {

    const { colors } = useAppSelector((state) => state.CommonSlice);

    return (
        StyleSheet.create({
            containerStyle: {
                marginVertical: wp(2.7)
            },
            inActiveIconStyle: {
                backgroundColor: colors.TRANSPARENT,
                borderColor: colors.SHADOW_1,
                borderWidth: wp(0.3),
                borderRadius: wp(1),
                width: wp(6),
                height: wp(6),
            },
            activeIconStyle: {
                width: wp(6),
                height: wp(6)
            },
            titleStyle: {
                marginLeft: wp(3),
                fontSize: FontSizes.FONT_SIZE_16,
                marginRight: wp(9)
            },
            closeIconStyle: {
                width: wp(4),
                height: wp(4),
                resizeMode: 'contain',
                tintColor: colors.PRIMARY
            },
            checkBoxContainerStyle: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: "space-between"
            },
            subTitleStyle: {
                marginHorizontal: wp(1),
                fontSize: FontSizes.FONT_SIZE_16,
            }
        })
    );
};
