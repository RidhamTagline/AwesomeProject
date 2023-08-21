import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../redux/Store'
import { useGlobalStyles } from '../../hooks/useGlobalStyles';

import { SafeAreaView } from 'react-native-safe-area-context';

import useCustomNavigation from '../../hooks/useCustomNavigation';
import CustomHeader from '../../components/CustomHeader';
import { Icons } from '../../utils/IconsPaths';
import { AppStrings } from '../../utils/AppStrings';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


const HomeScreen = () => {

    const Styles = useStyles();
    const GlobalStyles = useGlobalStyles();
    const { colors } = useAppSelector((state) => state.CommonSlice);
    const navigation = useCustomNavigation('DrawerStack')
    return (
        <View style={GlobalStyles.container}>
            <CustomHeader
                icon={Icons.MENU_ICON}
                onPress={() => {
                    navigation.openDrawer()
                }}
                title={AppStrings.dashboard}
            />
            <TouchableOpacity
                style={Styles.floatingActionBtn}
                activeOpacity={0.5}
                onPress={() => {
                    navigation.navigate('DrawerStack', { screen: 'SaleScreen' })
                }}
            >
                <Image source={Icons.PLUS_ICON} style={Styles.floatingActionBtnIconStyle} />
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen;

const useStyles = () => {

    const { colors } = useAppSelector((state) => state.CommonSlice);
    const GlobalStyles = useGlobalStyles();

    return StyleSheet.create({
        floatingActionBtn: {
            backgroundColor: colors.PRIMARY,
            position: 'absolute',
            bottom: wp(12),
            right: wp(7),
            padding: wp(5),
            borderRadius: wp(10)
        },
        floatingActionBtnIconStyle: {
            ...GlobalStyles.commonIconStyle,
            tintColor: colors.WHITE_ICON
        }
    });
};