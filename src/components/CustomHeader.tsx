import React, { memo } from 'react';
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalStyles } from '../hooks/useGlobalStyles';
import { useAppSelector } from '../redux/Store';
import { Fonts } from '../styles/Fonts';
import { FontSizes } from '../styles/FontSizes';
import { Icons } from '../utils/IconsPaths';

interface CustomHeaderProps {
    headerStyle?: ViewStyle,
    headerRightComponent?: React.ReactNode,
    headerLeftStyle?: ViewStyle,
    headerRightStyle?: ViewStyle,
    icon?: ImageSourcePropType,
    title?: string,
    txtStyle?: TextStyle,
    iconStyle?: ImageStyle,
    customHeaderComponent?: React.ReactNode,
    safeAreacontainer?: ViewStyle
};

const CustomHeader = (props: CustomHeaderProps & TouchableOpacityProps) => {

    const Styles = useStyles();
    const GlobalStyle = useGlobalStyles();

    return (
        <SafeAreaView edges={["top"]} style={props.safeAreacontainer}>
            <View style={[Styles.header, props.headerStyle]}>
                <View style={[Styles.headerLeftComponentStyle, props.headerLeftStyle]}>
                    {/* {props.icon && */}
                    <TouchableOpacity {...props}>
                        <Image
                            source={props.icon ?? Icons.MENU_ICON}
                            style={[GlobalStyle.commonIconStyle, Styles.iconStyle, props.iconStyle]} />
                    </TouchableOpacity>
                    {/* } */}
                    {props.title ?
                        <Text style={[Styles.headerTxtStyle, props.txtStyle]}>
                            {props.title}
                        </Text>
                        : null
                    }
                </View>
                {props.headerRightComponent ?
                    <View style={[Styles.headerRightComponentStyle, props.headerRightStyle]}>
                        {props.headerRightComponent}
                    </View>
                    : null
                }
            </View>
        </SafeAreaView>
    );
};

export default memo(CustomHeader);

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice);

    return (StyleSheet.create({
        header: {
            width: '100%',
            flexDirection: 'row',
            paddingVertical: wp(3),
            paddingHorizontal: wp(5),
            justifyContent: 'space-between',
            backgroundColor: colors.PRIMARY_BACKGROUND,
        },
        headerLeftComponentStyle: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        },
        headerRightComponentStyle: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        },
        headerTxtStyle: {
            color: colors.PRIMARY_TEXT,
            fontSize: FontSizes.FONT_SIZE_15,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
        },
        iconStyle: {
            marginRight: wp(5)
        }
    })
    );
};
