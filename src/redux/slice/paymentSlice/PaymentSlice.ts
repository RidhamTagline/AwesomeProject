import { createSlice } from "@reduxjs/toolkit";



export interface ItemDetailsProps {
    id: number,
    itemName: string,
    type: string,
}

export interface paymentDataProps{
    id: number,
    panels:string,
    method: string,
    grwt: string,
    tunch: string,
    total: string,
}


interface initialStateTypes{
    isLoading:boolean;
    ItemDetailsData:ItemDetailsProps[],
    paymentListData:paymentDataProps[],
}

const initialState: initialStateTypes = {
    isLoading:false,
    ItemDetailsData:[],
    paymentListData:[]
};

const PAYMENT = "PAYMENT";

const PaymentSlice = createSlice({
    name: PAYMENT,
    initialState,
    reducers: {
       updateItemDetailsReducer:(state,action)=>{
        const index = state.ItemDetailsData?.findIndex(obj => obj.id === action.payload?.id);
            if (index !== -1) {
                state.ItemDetailsData[index] = action.payload;
            }
            else {
                state.ItemDetailsData?.push(action.payload)
            }
       },
       deleteItemDetailsReducer:(state,action)=>{
            state.ItemDetailsData = state?.ItemDetailsData?.filter(item=>item.id !== action?.payload)
       },
       updatePaymentDetailsReducer:(state,action)=>{
        const index = state.paymentListData?.findIndex(obj => obj.id === action.payload?.id);
            if (index !== -1) {
                state.paymentListData[index] = action.payload;
            }
            else {
                state.paymentListData?.push(action.payload)
            }
       },
       deletePaymentDetailsReducer:(state,action)=>{
            state.paymentListData = state?.paymentListData?.filter(item=>item.id !== action?.payload)
       },

    },
     extraReducers(builder) {
        
     }

});

export const {updateItemDetailsReducer,deleteItemDetailsReducer,updatePaymentDetailsReducer,deletePaymentDetailsReducer } = PaymentSlice.actions;
export default PaymentSlice.reducer;
