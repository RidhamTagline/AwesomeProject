import { Platform, StyleSheet } from "react-native"
import { Fonts } from "../styles/Fonts";
import { useAppSelector } from "../redux/Store";
import { FontSizes } from "../styles/FontSizes";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const useGlobalStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice)

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.PRIMARY_BACKGROUND
        },
        centerContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        rowContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        commonIconStyle: {
            width: wp(6),
            height: wp(6),
            resizeMode: 'contain',
            tintColor: colors.SECONDARY_ICON
        },
        mainTitleStyle: {
            fontSize: FontSizes.FONT_SIZE_24,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            color: colors.PRIMARY_TEXT,
        },
        subTitleStyle: {
            fontSize: FontSizes.FONT_SIZE_14,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_REGULAR,
            color: colors.PRIMARY_TEXT,
        },
         bottomBtnContainerStyle: {
            backgroundColor: colors.PRIMARY_BACKGROUND,
            paddingHorizontal: wp(6),
            paddingVertical: wp(5),
            // elevation: 15,
            // shadowRadius: 10,
            // shadowOpacity: 0.2,
            // shadowColor: colors.SHADOW_2,
            // shadowOffset: { height: 0, width: 0 },
        },
        bottomBtnStyle: {
            backgroundColor: colors.PRIMARY,
            paddingVertical: wp(3),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: wp(2),
        },
    });
};
