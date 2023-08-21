import React from 'react';
import { Image, StyleSheet, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BottomTabParamList } from '../types/RootStackType';
import { Icons } from '../utils/IconsPaths';
import SaleScreen from '../screens/home/SaleScreen';
import { useAppSelector } from '../redux/Store';
import useCustomNavigation from '../hooks/useCustomNavigation';

const BottomTabNavigation = () => {

    const Tab = createBottomTabNavigator<BottomTabParamList>();
    const styles = useStyles()
    const navigation = useCustomNavigation('DrawerStack')
    const { colors } = useAppSelector(state => state.CommonSlice)

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle
            }}
        >
            <Tab.Screen
                name='HomeScreen'
                component={SaleScreen}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: (({ size, focused }) => (
                        <Image source={Icons.SALEICON} resizeMode='contain' style={{ height: wp(7), width: wp(7), tintColor: focused ? colors.PRIMARY : undefined }} />
                    ))
                }} />
            <Tab.Screen
                name='SaleScreen'
                component={SaleScreen}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: (({ size, focused }) => (
                        <Image source={Icons.DASHBOARD} resizeMode='contain' style={{ height: size, width: size, tintColor: focused ? colors.PRIMARY : undefined }} />
                    ))
                }} />

        </Tab.Navigator>
    );
};

export default BottomTabNavigation;

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice)

    return StyleSheet.create({

        tabBarStyle: {
            shadowOpacity: 0.1,
            shadowRadius: wp(2),
            elevation: 10,
        },
        taskContainer: {
            backgroundColor: colors.PRIMARY,
            padding: hp(2),
            borderRadius: wp(20),
            bottom: hp(2)
        },
    });

};
