import React, { Dispatch, SetStateAction, memo, useState } from 'react';
import { Image, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useGlobalStyles } from '../hooks/useGlobalStyles';
import { useAppSelector } from '../redux/Store';
import { FontSizes } from '../styles/FontSizes';
import { Fonts } from '../styles/Fonts';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icons } from '../utils/IconsPaths';
import { Dropdown } from 'react-native-element-dropdown';
import { DropdownProps, IDropdownRef } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

interface DropdownListProps {
    id: number,
    label: string,
    value: string,
};

interface CommonDropDownPickerProps {
    label?: string;
    labeltxtStyle?: TextStyle;
    data: DropdownListProps[];
    value?: string | null;
    borderStyle?: ViewStyle | any;
    rightIconvisible: boolean;
    isVisibleRenderItem?: boolean;
    dropDownRef?: IDropdownRef | undefined | null

};

const CommonDropDownComponent = (props: CommonDropDownPickerProps & DropdownProps<any>) => {
    const Globalstyle = useGlobalStyles();
    const Styles = useStyle();
    const [open, setOpen] = useState<boolean>(false)
    const { colors } = useAppSelector(state => state.CommonSlice)

    // const renderItem = (item: any) => {
    //     return (
    //         <View style={[Styles.item, { backgroundColor: colors.SECONDARY_BACKGROUND }]}>
    //             <Text style={Styles.textItem}>{item.label}</Text>
    //             <Image source={item.value === props.value ? Icons.SELECTED_RADIO_BUTTON_ICON : Icons.RADIO_BUTTON_ICON} style={[Globalstyle.commonIconStyle, { tintColor: item.value === props.value ? colors.PRIMARY : colors.SECONDARY_ICON }]} />
    //         </View>
    //     );
    // };
    return (
        <>
            {props.label &&
                <Text style={[Styles.lableTxtStyle, props.labeltxtStyle]}>{props.label}</Text>
            }
            <Dropdown
                {...props}
                ref={props?.dropDownRef}
                onFocus={() => setOpen(!open)}
                onBlur={() => setOpen(false)}
                style={[Styles.dropdown, props.borderStyle]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                selectedTextProps={{
                    numberOfLines: 10,
                }}
                renderRightIcon={() => props.rightIconvisible ?
                    <Image
                        source={Icons.DROPDOWNICONS}
                        style={[Styles.iconStyle, open ? Styles.upIconStyle : null]}
                    /> : null}

                itemContainerStyle={{ marginVertical: wp(-1) }}
                data={props.data}
                maxHeight={hp(35)}
                value={props.value}
                containerStyle={Styles.containerStyle}
                itemTextStyle={Styles.textItem}

            />
        </>
    );
};

export default memo(CommonDropDownComponent);

const useStyle = () => {
    const { colors } = useAppSelector(state => state.CommonSlice)

    return StyleSheet.create({
        lableTxtStyle: {
            fontSize: FontSizes.FONT_SIZE_16,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            color: colors.PRIMARY_TEXT,
        },
        dropdown: {
            paddingHorizontal: wp(3),
            paddingVertical: wp(0.5),
            borderWidth: 1,
            borderColor: colors.BOX_BORDER,
        },
        item: {
            padding: wp(4),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        textItem: {
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_REGULAR,
            fontSize: FontSizes.FONT_SIZE_14,
            color: colors.PRIMARY_TEXT
        },
        placeholderStyle: {
            fontSize: FontSizes.FONT_SIZE_14,
            color: colors.SECONDARY_TEXT,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_REGULAR
        },
        selectedTextStyle: {
            fontSize: FontSizes.FONT_SIZE_14,
            color: colors.PRIMARY_TEXT,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_REGULAR,
            alignSelf: 'center',
        },
        iconStyle: {
            width: wp(3.5),
            height: wp(3.5),
            resizeMode: 'contain',
            tintColor: colors.SECONDARY_ICON,
        },
        upIconStyle: {
            transform: [{ rotate: '180deg' }]
        },
        inputSearchStyle: {
            height: wp(12),
        },
        containerStyle: {
            borderRadius: wp(2),
            borderWidth: wp(0.2),
            borderColor: colors.BOX_BORDER,

        }

    });
};

