import React from 'react';
import { AuthStackParamList } from '../types/RootStackType';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/auth/SignInScreen';
import VerifyUserScreen from '../screens/auth/VerifyUserScreen';

const Auth = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (
        <Auth.Navigator screenOptions={{ headerShown: false }}>
            <Auth.Screen name={'SignInScreen'} component={SignInScreen} />
            <Auth.Screen name={'VerifyUserScreen'} component={VerifyUserScreen} />
        </Auth.Navigator>
    );
};

export default AuthStack;
