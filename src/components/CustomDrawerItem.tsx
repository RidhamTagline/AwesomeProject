import React, { memo, useEffect, useState } from "react";
import { FlatList, Image, ImageProps, LayoutAnimation, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { AppStrings } from "../utils/AppStrings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../redux/Store";
import { ImagesPaths } from "../utils/ImagesPaths";
import { Icons } from "../utils/IconsPaths";
import { useGlobalStyles } from "../hooks/useGlobalStyles";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Fonts } from "../styles/Fonts";
import CustomPrimaryButton from "./CustomPrimaryButton";
import { FontSizes } from "../styles/FontSizes";
import { AppAlert } from "../utils/AppAlerts";

export interface Draweritem {
    id: number;
    title: string;
    icon: ImageProps;
    screenName: string;
    subItems?: Draweritem[] | [],
    expandIcon?: ImageProps,
};

export const DrawerItems: Draweritem[] = [
    {
        id: 1,
        title: AppStrings.transaction,
        icon: Icons.TRANSACTIONICON,
        screenName: "",
        expandIcon: Icons.DROPDOWNICONS,
        subItems: [
            {
                id: 2,
                title: AppStrings.sale,
                icon: Icons.SALEICON,
                screenName: "SaleScreen",
            },
            {
                id: 3,
                title: AppStrings.payment,
                icon: Icons.PAYMENTICON,
                screenName: '',
            },
            {
                id: 4,
                title: AppStrings.reciept,
                icon: Icons.RECEIPTICON,
                screenName: '',
            },
        ]

    },
    {
        id: 5,
        title: AppStrings.master,
        icon: Icons.MASTERICON,
        screenName: '',
        expandIcon: Icons.DROPDOWNICONS,
        subItems: [
            {
                id: 6,
                title: AppStrings.items,
                icon: Icons.ITEMSICON,
                screenName: "",
            },
            {
                id: 7,
                title: AppStrings.vendors,
                icon: Icons.ITEMGROUPSICON,
                screenName: "",
            },
            {
                id: 8,
                title: AppStrings.groups,
                icon: Icons.CUSTOMERSICON,
                screenName: "",
            },
            {
                id: 9,
                title: AppStrings.customers,
                icon: Icons.VENDORSICON,
                screenName: "",
            },
            {
                id: 10,
                title: AppStrings.vendors,
                icon: Icons.ACCOUNTGROUPICON,
                screenName: "",
            },
            {
                id: 11,
                title: AppStrings.groups,
                icon: Icons.USERPROFILE,
                screenName: "",
            },
        ]
    },
    {
        id: 12,
        title: AppStrings.reports,
        icon: Icons.REPORTICONS,
        screenName: AppStrings.settings,
        expandIcon: Icons.DROPDOWNICONS,
        subItems: [
            {
                id: 13,
                title: AppStrings.customer_ledger,
                icon: Icons.CUSTOMERSICON,
                screenName: "CustomerLedgerScreen",
            },
            {
                id: 14,
                title: AppStrings.sales,
                icon: Icons.SALESICON,
                screenName: "",
            },
        ]
    },
    {
        id: 15,
        title: AppStrings.settings,
        icon: Icons.SETTINGSICON,
        screenName: AppStrings.reports,
        expandIcon: Icons.DROPDOWNICONS,
        subItems: [
            {
                id: 16,
                title: AppStrings.roles,
                icon: Icons.ROLESICON,
                screenName: "",
            },
            {
                id: 17,
                title: AppStrings.users,
                icon: Icons.USERSICON,
                screenName: "",
            },
            {
                id: 18,
                title: AppStrings.user_activities,
                icon: Icons.USERACTIVITIESICON,
                screenName: "",
            },
        ]
    },
];

const CustomDrawerItem = ({ currentScreen, navigation }: { currentScreen: number } & DrawerContentComponentProps) => {

    const [selectedDrawerItem, setSelectedDrawerItem] = useState<number>(0);
    const insets = useSafeAreaInsets();
    const Styles = useStyles();
    const GlobalStyle = useGlobalStyles();
    const dispatch = useAppDispatch();
    const [isExpandContainer, setIsExpandContainer] = useState<Draweritem | null>(null);
    const { userDetail } = useAppSelector(state => state.AuthSlice)

    const { colors } = useAppSelector(state => state.CommonSlice);

    useEffect(() => {
        setSelectedDrawerItem(currentScreen)
    }, [currentScreen])

    const handleClick = (item: Draweritem) => {
        setSelectedDrawerItem(item.id);
        if (!item.expandIcon && item.screenName) {
            navigateToOtherScreen(item.screenName)
        } else {
            if (isExpandContainer?.id !== item.id) {
                setIsExpandContainer(item)
            } else {
                setIsExpandContainer(null)
            }
        }
        LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.linear, duration: 300 });
    };

    const navigateToOtherScreen = (screenName: string) => {
        //scree name to navigate other screen
        navigation.closeDrawer();
        navigation?.navigate('DrawerStack', { screen: screenName });
    }

    const renderItem = ({ item, index }: { item: Draweritem, index: number }) => {
        return (
            <TouchableWithoutFeedback
                disabled={!item.screenName ? true : false}
                onPress={() => {
                    setSelectedDrawerItem(item.id);
                    navigateToOtherScreen(item.screenName)
                }}>
                <View
                    style={[GlobalStyle.rowContainer,
                    Styles.DrawerItems,
                    { marginHorizontal: wp(3) },
                    item.id === selectedDrawerItem
                        ? { backgroundColor: colors.SHADOW_1 }
                        : null,
                    ]}
                >
                    <View
                        style={[Styles.activeDrawerItem, item.id === selectedDrawerItem ? { backgroundColor: colors.PRIMARY } : null]}
                    ></View>
                    <Image
                        source={
                            item.icon
                        }
                        style={Styles.iconsStyle}
                    />
                    <Text style={[GlobalStyle.subTitleStyle, Styles.itemTitleStyle]}>{item.title}</Text>
                    {item.expandIcon &&
                        <Image source={item.expandIcon} style={[GlobalStyle.commonIconStyle]} />
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    };


    return (
        <>

            <View style={[GlobalStyle.container, { marginTop: Math.max(insets.top) }]}>
                <View style={Styles.drawerContainer}>
                    <Image
                        source={ImagesPaths.APP_ICONS}
                        style={Styles.userProfileImage}
                        resizeMode={'cover'}
                    />
                    <FlatList
                        data={DrawerItems}
                        bounces={false}
                        contentContainerStyle={{ paddingBottom: hp(16) }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            if (!item?.title) {
                                return null
                            }
                            return (
                                <>
                                    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
                                        <View
                                            style={[GlobalStyle.rowContainer,
                                            Styles.DrawerItems,
                                            item.id === selectedDrawerItem && !item.expandIcon
                                                ? { backgroundColor: colors.SHADOW_1 }
                                                : null,
                                            ]}
                                        >
                                            <View
                                                style={[Styles.activeDrawerItem, item.id === selectedDrawerItem && !item.expandIcon ? { backgroundColor: colors.PRIMARY } : null]}
                                            ></View>
                                            <Image
                                                source={
                                                    item.icon
                                                }
                                                style={[Styles.iconsStyle,
                                                item.id === selectedDrawerItem ? {
                                                    tintColor: colors.PRIMARY_ICON
                                                } : undefined
                                                ]}
                                            />
                                            <Text style={[GlobalStyle.subTitleStyle, Styles.itemTitleStyle, item.id === selectedDrawerItem ? {
                                                color: colors.PRIMARY_ICON
                                            } : undefined]}>{item.title}</Text>
                                            {item.expandIcon &&
                                                <Image source={item.expandIcon} style={[Styles.dropDowniconsStyle, { transform: isExpandContainer?.id === item.id ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }] }]} />
                                            }
                                        </View>
                                    </TouchableWithoutFeedback>
                                    {isExpandContainer && isExpandContainer?.id === item.id &&
                                        <FlatList data={isExpandContainer?.subItems} renderItem={renderItem} />
                                    }

                                </>
                            )
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity style={Styles.bottomBtnContainerStyle}
                activeOpacity={1}
                onPress={() => {
                    navigation.closeDrawer()
                    AppAlert(AppStrings.logOut, AppStrings.are_you_really_want_logout)
                }}
            >
                <View style={[GlobalStyle.rowContainer, { justifyContent: "space-between" }]}>
                    <View style={[GlobalStyle.rowContainer, { flex: 1 }]}>
                        <View style={Styles.userIconView}>
                            <Image source={Icons.USERPROFILE} style={Styles.useIconStyle} />
                        </View>
                        <Text style={Styles.userNametext}>{userDetail?.fullname ?? ""}</Text>
                    </View>
                    <Image source={Icons.LOGOUTICON} style={Styles.logOutIcon} />
                </View>
            </TouchableOpacity >
        </>
    );
};

export default memo(CustomDrawerItem);

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice);

    return (
        StyleSheet.create({
            userProfileImage: {
                width: wp(17),
                height: wp(17),
                borderRadius: wp(17),
                marginVertical: wp(3)
            },
            drawerContainer: {
                padding: "5%"
            },
            DrawerItems: {
                borderRadius: wp(2),
                marginVertical: "3.7%",
                padding: "4%",
            },
            activeDrawerItem: {
                height: "95%",
                width: "2%",
                borderBottomRightRadius: wp(5),
                borderTopRightRadius: wp(5),
                marginLeft: "-4%",
            },
            iconsStyle: {
                marginLeft: "3%",
                width: wp(5),
                height: wp(5),
                resizeMode: 'contain',
                tintColor: colors.SECONDARY_ICON
            },
            itemTitleStyle: {
                marginLeft: "5%",
                flex: 1,
                fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD
            },
            dropDowniconsStyle: {
                width: wp(3.5),
                height: wp(3.5),
                resizeMode: 'contain'
            },
            bottomBtnContainerStyle: {
                backgroundColor: colors.PRIMARY_BACKGROUND,
                paddingHorizontal: wp(6),
                paddingVertical: wp(4),
                elevation: 15,
                shadowRadius: 10,
                shadowOpacity: 0.2,
                shadowColor: colors.SHADOW_2,
                shadowOffset: { height: 0, width: 0 },
            },
            useIconStyle: {
                width: wp(6),
                height: wp(6),
                tintColor: colors.WHITE_ICON,
            },
            userIconView: {
                backgroundColor: colors.PRIMARY,
                padding: wp(3),
                borderRadius: wp(10),
            },
            userNametext: {
                fontFamily: Fonts.FONT_SORCE_SANS_PRO_BOLD,
                fontSize: FontSizes.FONT_SIZE_17,
                color: colors.PRIMARY_TEXT,
                marginLeft: wp(2),
                textTransform: 'capitalize'
            },
            logOutIcon: {
                width: wp(8),
                height: wp(8),
                resizeMode: 'contain',
                tintColor: colors.SECONDARY_ICON
            }
        })
    );
};
