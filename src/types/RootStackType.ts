import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    AuthStack: NavigatorScreenParams<AuthStackParamList>;
    DrawerStack: NavigatorScreenParams<DrawerStackParamList>;
    AddSaleItemScreen:{itemId?:number|string} | undefined;
    AddItemDetailsScreen:{itemId?:number,itemName?:string};
    AddPaymentScreen:{itemId?:number},
    AddAccountScreen:undefined

};

export type AuthStackParamList = {
    SignInScreen:undefined,
    VerifyUserScreen:undefined,
}

export type DrawerStackParamList = {
    SaleScreen:undefined,
    CustomerLedgerScreen:undefined    
}

export type BottomTabParamList = {
    HomeScreen:undefined,
    SaleScreen:undefined,
    AddSaleItemScreen:undefined;
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>;
