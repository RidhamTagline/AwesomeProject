import React, { useEffect, useState } from 'react';
import { DrawerStackParamList } from '../types/RootStackType';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerItem, { DrawerItems } from '../components/CustomDrawerItem';
import { useAppSelector } from '../redux/Store';
import SaleScreen from '../screens/home/SaleScreen';
import CustomerLedgerScreen from '../screens/utils/CustomerLedgerScreen';


const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerStack = () => {

    const { colors } = useAppSelector(state => state.CommonSlice)
    const [currentScreen, setcurrentScreen] = useState(0);
    const { userDetail } = useAppSelector(state => state.AuthSlice)

    return (
        <Drawer.Navigator
            // initialRouteName=''
            screenListeners={{
                focus: (preProps) => {
                    let scrName = preProps?.target?.split("-")[0]
                    let screen = DrawerItems.find((item) => item.screenName == scrName);
                    if (!!screen && Object.keys(screen).length != 0) {
                        setcurrentScreen(screen.id);
                    }
                }
            }}
            screenOptions={{
                headerShown: false, drawerStyle: {
                    backgroundColor: colors.PRIMARY_BACKGROUND,
                },
                swipeEnabled: !userDetail?.id ? true : false,
                drawerType: 'front'
            }} drawerContent={(props) => <CustomDrawerItem {...props} currentScreen={currentScreen} />}>
            <Drawer.Screen name={'SaleScreen'} component={SaleScreen} />
            <Drawer.Screen name={'CustomerLedgerScreen'} component={CustomerLedgerScreen} />

        </Drawer.Navigator>
    );
};

export default DrawerStack;
