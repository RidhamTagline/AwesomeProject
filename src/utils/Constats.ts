import { number, string } from "yup";
import { AppStrings } from "./AppStrings";
import { Icons } from "./IconsPaths";
import { RootRouteProps, RootStackParamList } from "../types/RootStackType";

export interface DropDownListProps {
    id: number,
    label: string,
    value: string,
};

export interface RadioBtnProps{
        id:string,
        item:string
}

export interface quickActionButtonDataProps {
    id:number,
    title:string,
    screenName:string | any
}

export const category: DropDownListProps[] = [
    { id: 1, label: 'wholesale', value: 'wholesale' },
];

export const units: DropDownListProps[] = [
    { id: 1, label: 'Gm', value: 'Gm' },
    { id: 2, label: 'Kg', value: 'Kg' },
    { id: 3, label: 'Pc', value: 'Pc' },
    { id: 4, label: 'Carat', value: 'Carat' },
    { id: 5, label: 'Ratti', value: 'Ratti' },
    { id: 6, label: 'Cent', value: 'Cent' },
];

export const LabourUnits:DropDownListProps[]=[
    { id: 1, label: 'Wt', value: 'Wt' },
    { id: 2, label: 'Rs', value: 'Rs' },
    { id: 3, label: '%', value: '%' },
    { id: 4, label: 'M%', value: 'M%' },
    { id: 5, label: 'Tot%', value: 'Tot%' },
    { id: 6, label: 'Gm', value: 'Gm' },
];

export const stockMethod:DropDownListProps[]=[
    { id: 1, label: 'Default', value: 'default' },
    { id: 2, label: 'Item wise', value: 'itemwise' },
];

export const itemType:DropDownListProps[]=[
    { id: 1, label: 'S', value: 'S' },
    { id: 2, label: 'P', value: 'P' },
    { id: 3, label: 'SR', value: 'SR' },
];

export const itemStamp:DropDownListProps[] = [
    { id: 1, label: '24K', value: '24K' },
    { id: 2, label: '23K', value: '23K' },
    { id: 3, label: '22K', value: '22K' },
    { id: 4, label: '18K', value: '18K' },
    { id: 5, label: '14K', value: '14K' },
    { id: 6, label: '10K', value: '10K' },
];

export const panelsType:DropDownListProps[] = [
    { id: 1, label: 'Reciept', value: 'Reciept' },
    { id: 2, label: 'Payment', value: 'Payment' },
    { id: 3, label: 'Gold Bhav', value: 'Gold Bhav' },
    { id: 4, label: 'Metal Reciept', value: 'Metal Reciept' },
    { id: 5, label: 'Metal Paid', value: 'Metal Paid' },
];

export const paymentsType:DropDownListProps[] = [
    { id: 1, label: 'Cash', value: 'Cash' },
    { id: 2, label: 'Card', value: 'Card' },
    { id: 3, label: 'Cheque', value: 'Cheque' },
    { id: 4, label: 'Others', value: 'Others' },
];
export const otherPaymentMethod:DropDownListProps[] = [
    { id: 1, label: 'Reciept', value: 'Reciept' },
    { id: 2, label: 'Payment', value: 'Payment' },
];

export const customerGroup: DropDownListProps[] = [
    { id: 1, label: 'Retail Sale', value: 'Retail Sale' },
    { id: 2, label: 'Wholesale', value: 'Wholesale' },
    { id: 3, label: 'Cash Sale', value: 'Cash Sale' },
];


export const radioBtnconstant:RadioBtnProps[]= [
    {
        id:"Dr",
        item:"Dr"
    },
    {
        id:"Cr",
        item:"Cr"
    },
];


export const dropdownfieldIndex = [0,1,2,3,12]

// export const saleMasterTableData =[
//     [
//         {
//             type:"DropDown",
//             value:'',
//             data:[],
//             placeHolder:AppStrings.item
//         },
//         // {
//         //     type:"DropDown",
//         //     value:'S',
//         //     data:itemType,
//         //     placeHolder:'S'
//         // },
//         // {
//         //     type:"DropDown",
//         //     value:'',
//         //     data:itemStamp,
//         //     placeHolder:"Stamp"

//         // },
//         // {
//         //     type:"DropDown",
//         //     value:'',
//         //     data:units,
//         //     placeHolder:"Unit"
//         // },
//         // {
//         //     type:"TextInput",
//         //     value:'',
//         //     placeHolder:"0"
//         // },
//         {
//             type:"TextInput",
//             value:'',
//             placeHolder:"0.000"
//         },
//         {
//             type:"TextInput",
//             value:'',
//             placeHolder:"0.000"
//         },
//         {
//             type:"TextInput",
//             value:'',
//             placeHolder:"0.000",
//             editable:true
//         },
//         // {
//         //     type:"TextInput",
//         //     value:'',
//         //     placeHolder:"0"
//         // },
//         // {
//         //     type:"TextInput",
//         //     value:'',
//         //     placeHolder:"0.000",
//         // },
//         // {
//         //     type:"TextInput",
//         //     value:'',
//         //     placeHolder:"00.00",
//         // },
//         // {
//         //     type:"TextInput",
//         //     value:'',
//         //     placeHolder:"00.00",
//         // },
//         // {
//         //     type:"DropDown",
//         //     value:'',
//         //     data:LabourUnits,
//         //     placeHolder:"On",
//         // },
//         // {
//         //     type:"TextInput",
//         //     value:'',
//         //     placeHolder:"0.000",
//         // },
//         // {
//         //     type:"TextInput",
//         //     value:'',
//         //     placeHolder:"00.00",
//         // },
//          {
//             type:"",
//             value:'',
//             icon:Icons.CLOSEICON
//         },
//     ]
// ]

// export const panelesTableListData =[
//     [
//        {
//             type:"DropDown",
//             value:'',
//             data:panelsType,
//             placeHolder:"Select Panel"
//         },
//         {
//             type:"DropDown",
//             value:'',
//             data:paymentsType,
//             placeHolder:'Method'
//         },
//         {
//             type:"TextInput",
//             value:'',
//             data:itemStamp,
//             placeHolder:"0.000"

//         },
//         // {
//         //     type:"TextInput",
//         //     value:'',
//         //     placeHolder:"0"
//         // },
//         {
//             type:"TextInput",
//             value:'',
//             placeHolder:"00.00",
//             editable:true
//         },
//         // {
//         //     type:"TextInput",
//         //     value:'',
//         //     placeHolder:"00.00"
//         // },
//         // {
//         //     type:"TextInput",
//         //     value:'',
//         //     placeHolder:"0.00",
//         //     editable:true
//         // },
//          {
//             type:"",
//             value:'',
//             icon:Icons.CLOSEICON
//         },
//     ]
// ]


 export const saleMasterTableData = [
    ["","","","",""]
]

export const panelesTableListData =[
    ["","","","",""],
];

export const quickActionButtonData:quickActionButtonDataProps[] = [
    {
        id:1,
        title:"Add Item",
        screenName:'AddSaleItemScreen'
    },
    {
        id:2,
        title:"Add Vendor",
        screenName:""
    },
    {
        id:3,
        title:"Add Customer",
        screenName:""
    },
    {
        id:4,
        title:"Add Invoice",
        screenName:""
    },
    {
        id:5,
        title:"Add Role",
        screenName:""
    },
    {
        id:6,
        title:"Add User",
        screenName:"AddAccountScreen"
    }
    
]

 export const ledgerTableData = [
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""]
]

export const paymentTableData =[
    ["Total Sale","","","","","",""],
    ["Return","","","","","",""],
    ["Total","","","","","",""],
    ["ADD","","","","","",""],
    ["LESS","","","","","",""],
];