import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalStyles } from '../../hooks/useGlobalStyles'
import CustomHeader from '../../components/CustomHeader';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppSelector } from '../../redux/Store';
import { DropDownListProps, LabourUnits, itemType } from '../../utils/Constats';
import CommonDropDownComponent from '../../components/CustomDropdownFeild';
import { AppStrings } from '../../utils/AppStrings';
import { FontSizes } from '../../styles/FontSizes';
import { Fonts } from '../../styles/Fonts';
import CustomTextInput from '../../components/CustomTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ItemsDetailsScreen = () => {

    const GlobalStyles = useGlobalStyles();
    const Styles = useStyles();
    const navigation = useCustomNavigation('DrawerStack');
    const [saleItem, setSaleItem] = useState<DropDownListProps[]>();
    const { colors } = useAppSelector(state => state.CommonSlice)
    const { saleItemsData } = useAppSelector(state => state.SaleSlice)

    useEffect(() => {
        if (saleItemsData) {
            const data = saleItemsData.map(item => ({
                id: Math.floor(Math.random() * 10),
                label: `${item.name}(${item.unit})`,
                value: `${item.name}(${item.unit})`,
            }));
            setSaleItem(data);
        }
    }, [saleItemsData]);

    return (
        <View style={GlobalStyles.container}>
            <CustomHeader title='Item Details' onPress={() => {
                navigation.openDrawer();
            }} />
            <KeyboardAwareScrollView>

                <View style={Styles.container}>
                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.item_name}</Text>
                    <CommonDropDownComponent
                        labelField="label"
                        valueField="value"
                        placeholder={AppStrings.add_item_modal_placeHolder.itemName}
                        data={saleItem ?? []}
                        value={'values.group'}
                        rightIconvisible={true}
                        isVisibleRenderItem
                        onChange={(item: DropDownListProps) => {
                            // setFieldValue("group", item.value);
                        }}
                    // borderStyle={{ borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                    />
                    {/* {(touched.group && errors.group) ? <CommonErrorText title={errors.group} /> : null} */}

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.item_name}</Text>
                    <CommonDropDownComponent
                        labelField="label"
                        valueField="value"
                        placeholder={"S"}
                        data={itemType}
                        value={'values.group'}
                        rightIconvisible={true}
                        isVisibleRenderItem
                        onChange={(item: DropDownListProps) => {
                            // setFieldValue("group", item.value);
                        }}
                    // borderStyle={{ borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                    />
                    {/* {(touched.group && errors.group) ? <CommonErrorText title={errors.group} /> : null} */}

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.stamp}</Text>
                    <CommonDropDownComponent
                        labelField="label"
                        valueField="value"
                        placeholder={AppStrings.stamp}
                        data={itemType}
                        value={'values.group'}
                        rightIconvisible={true}
                        isVisibleRenderItem
                        onChange={(item: DropDownListProps) => {
                            // setFieldValue("group", item.value);
                        }}
                    // borderStyle={{ borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                    />
                    {/* {(touched.group && errors.group) ? <CommonErrorText title={errors.group} /> : null} */}

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{AppStrings.add_item_modal_placeHolder.unit}</Text>
                    <CommonDropDownComponent
                        labelField="label"
                        valueField="value"
                        placeholder={AppStrings.add_item_modal_placeHolder.unit}
                        data={itemType}
                        value={'values.group'}
                        rightIconvisible={true}
                        isVisibleRenderItem
                        onChange={(item: DropDownListProps) => {
                            // setFieldValue("group", item.value);
                        }}
                    // borderStyle={{ borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                    />
                    {/* {(touched.group && errors.group) ? <CommonErrorText title={errors.group} /> : null} */}

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Pc"}</Text>
                    <CustomTextInput
                        placeholder={"0"}
                        keyboardType='number-pad'
                    // value={values.amount.toString()}
                    // onChangeText={handleChange('amount')}
                    />

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Gr. Wt."}</Text>
                    <CustomTextInput
                        placeholder={"0.000"}
                        keyboardType='number-pad'
                    // value={values.amount.toString()}
                    // onChangeText={handleChange('amount')}
                    />

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Less"}</Text>
                    <CustomTextInput
                        placeholder={"0.000"}
                        keyboardType='number-pad'
                    // value={values.amount.toString()}
                    // onChangeText={handleChange('amount')}
                    />

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Net Wt"}</Text>
                    <CustomTextInput
                        placeholder={"0.000"}
                        keyboardType='number-pad'
                    // value={values.amount.toString()}
                    // onChangeText={handleChange('amount')}
                    />

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Tunch"}</Text>
                    <CustomTextInput
                        placeholder={"0"}
                        keyboardType='number-pad'
                    // value={values.amount.toString()}
                    // onChangeText={handleChange('amount')}
                    />

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Wstg"}</Text>
                    <CustomTextInput
                        placeholder={"0.000"}
                        keyboardType='number-pad'
                    // value={values.amount.toString()}
                    // onChangeText={handleChange('amount')}
                    />

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Rate"}</Text>
                    <CustomTextInput
                        placeholder={"0.000"}
                        keyboardType='number-pad'
                    // value={values.amount.toString()}
                    // onChangeText={handleChange('amount')}
                    />

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Lbr"}</Text>
                    <CustomTextInput
                        placeholder={"00.00"}
                        keyboardType='number-pad'
                    // value={values.amount.toString()}
                    // onChangeText={handleChange('amount')}
                    />

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"On"}</Text>
                    <CommonDropDownComponent
                        labelField="label"
                        valueField="value"
                        placeholder={"On"}
                        data={LabourUnits}
                        value={'values.group'}
                        rightIconvisible={true}
                        isVisibleRenderItem
                        onChange={(item: DropDownListProps) => {
                            // setFieldValue("group", item.value);
                        }}
                    // borderStyle={{ borderColor: (touched.name && errors.name) ? colors.ERROR_TEXT : colors.BOX_BORDER }}
                    />
                    {/* {(touched.group && errors.group) ? <CommonErrorText title={errors.group} /> : null} */}

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Fine"}</Text>
                    <CustomTextInput
                        placeholder={"0.000"}
                        keyboardType='number-pad'
                    // value={values.amount.toString()}
                    // onChangeText={handleChange('amount')}
                    />

                    <Text style={[Styles.textInputLablePreFixTextStyle, Styles.textInputLabelText]}>{"Total"}</Text>
                    <CustomTextInput
                        placeholder={"0.00"}
                        keyboardType='number-pad'
                    // value={values.amount.toString()}
                    // onChangeText={handleChange('amount')}
                    />

                    <View style={[GlobalStyles.rowContainer, Styles.bottomBtnRowContainer]}>
                        <TouchableOpacity
                            style={[Styles.cancelBtnContainer, Styles.bottomBtncontainer]}
                            onPress={() => { navigation.goBack() }}>
                            <Text style={[Styles.btnTitleStyle, { color: colors.PRIMARY_TEXT }]}>{AppStrings.cancel}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[Styles.submitBtnContainer, Styles.bottomBtncontainer]}
                            onPress={() => { }}
                        >
                            <Text style={Styles.btnTitleStyle}>{AppStrings.submit}</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ItemsDetailsScreen;

const useStyles = () => {

    const GlobalStyles = useGlobalStyles();
    const { colors } = useAppSelector(state => state.CommonSlice)

    return StyleSheet.create({
        container: {
            paddingHorizontal: wp(5)
        },
        textInputLablePreFixTextStyle: {
            color: colors.ERROR_TEXT,
            marginTop: wp(5),
            marginBottom: wp(3),
            alignSelf: 'flex-start'
        },
        textInputLabelText: {
            color: colors.PRIMARY_TEXT,
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            fontSize: FontSizes.FONT_SIZE_14,
        },
        cancelBtnContainer: {
            borderWidth: wp(0.3),
            borderColor: colors.PRIMARY,
            marginHorizontal: wp(2),
        },
        submitBtnContainer: {
            borderWidth: wp(0.3),
            borderColor: colors.TRANSPARENT,
            backgroundColor: colors.PRIMARY,
        },
        bottomBtncontainer: {
            paddingVertical: wp(2),
            borderRadius: wp(10),
            paddingHorizontal: wp(5),
        },
        bottomBtnRowContainer: {
            alignSelf: 'center',
            marginTop: wp(3),
            paddingBottom: wp(7)
        },
        btnTitleStyle: {
            fontFamily: Fonts.FONT_SORCE_SANS_PRO_SEMI_BOLD,
            fontSize: FontSizes.FONT_SIZE_14,
            color: colors.BUTTON_TEXT,
            alignSelf: 'center'
        },
    })
}