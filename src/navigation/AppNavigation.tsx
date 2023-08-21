import React from 'react';
import { RootStackParamList } from '../types/RootStackType';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../redux/Store';
import { StatusBar } from 'react-native';
import AuthStack from './AuthStack';
import DrawerStack from './DrawerStack';
import AddPaymentScreen from '../screens/utils/AddPaymentScreen';
import AddItemDetailsScreen from '../screens/utils/AddItemDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {

    const { colors, isDarkMode } = useAppSelector(state => state.CommonSlice)
    const { userDetail } = useAppSelector(state => state.AuthSlice)

    return (
        <>
            <Stack.Navigator
                initialRouteName={(userDetail && userDetail?.id) ? 'DrawerStack' : 'AuthStack'}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name={'AuthStack'} component={AuthStack} />
                <Stack.Screen name={'DrawerStack'} component={DrawerStack} />
                <Stack.Screen name={'AddItemDetailsScreen'} component={AddItemDetailsScreen} />
                <Stack.Screen name={'AddPaymentScreen'} component={AddPaymentScreen} />
            </Stack.Navigator>
            <StatusBar translucent={false} backgroundColor={colors.PRIMARY_BACKGROUND} barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        </>
    );
};

export default AppNavigation;
