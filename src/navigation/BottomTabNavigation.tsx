import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { BottomTabParamList } from '../types/RootStackType';
import { Icons } from '../utils/IconsPaths';
import HomeScreen from '../screens/utils/HomeScreen';
import AddSaleItemScreen from '../screens/utils/AddSaleItemScreen';
import SaleScreen from '../screens/home/SaleScreen';
import { useAppDispatch, useAppSelector } from '../redux/Store';
import useCustomNavigation from '../hooks/useCustomNavigation';




const BottomTabNavigation = () => {

    const Tab = createBottomTabNavigator<BottomTabParamList>();
    const styles = useStyles()
    const navigation = useCustomNavigation('DrawerStack')
    const dispatch = useAppDispatch()
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
                name='AddSaleItemScreen'
                component={AddSaleItemScreen}
                listeners={{
                    tabPress: () => {
                        navigation.navigate('AddSaleItemScreen');
                    },
                }}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: (({ size }) => (
                        <View style={styles.taskContainer}>
                            <Image source={Icons.PLUS_ICON} resizeMode='contain' style={{ height: size, width: size }} />
                        </View>
                    ))
                }} />
            <Tab.Screen
                name='SaleScreen'
                component={SaleScreen}
                // listeners={{
                //     tabPress: () => {
                //         navigation.navigate('DrawerStack', {
                //             screen: 'SaleScreen'
                //         });
                //     },
                // }}
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
