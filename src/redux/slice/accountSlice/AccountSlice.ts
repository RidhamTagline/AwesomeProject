import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppAlert } from "../../../utils/AppAlerts";
import { AppStrings } from "../../../utils/AppStrings";
import { apiErrorTypes } from "../authSlice/AuthSlice";
import { axiosClient } from "../../../config/Axios";
import { ApiConstants } from "../../../config/ApiConstants";
import { parseErrorData } from "../../CommonSlice";
import axios from "axios";
import { store } from "../../Store";

export interface CreatedByProps {
    id: number;
    fullname: string;
    email: string;
    contact_no: string;
    description: string;
    created_at: string;
    updated_at: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
    last_login: string;
    role: string;
    groups: number[];
    user_permissions: any[]; 
}

interface AccountListProps {
    id: number;
    created_by: CreatedByProps;
    silver_fine_amount: number;
    gold_fine_amount: number;
    opening_balance_total_amount: number;
    opening_balance_total_amount_choice: "Dr" | "Cr";
    silver_fine_choice: "Dr" | "Cr";
    gold_fine_choice: "Dr" | "Cr";
    name: string;
    address: string;
    alternate_contact: string;
    dob: string;
    contactno: string;
    balance_total_amount: number;
    opening_gold_fine_amount: number;
    opening_silver_fine_amount: number;
    created_at: string;
    updated_at: string;
    group_name: number;
};

interface groupListProps{
    id: number,
    created_by:CreatedByProps,
    belongs_to: string | null,
    total_items: string,
    name: string,
    created_at: string,
    updated_at: string
}

interface accountListDataProps{
        count: number,
        next: string|null,
        previous: string|null,
        results:AccountListProps[] | undefined
};

interface groupListDataProps {
        count: number,
        next: string|null,
        previous: string|null,
        results:groupListProps[] | undefined
}

interface initialStateTypes{
    isLoading:boolean;
    accountListData:accountListDataProps;
    groupListData:groupListDataProps;
}

const initialState: initialStateTypes = {
    isLoading:false,
    accountListData:{
        count:0,
        next:null,
        previous:null,
        results:undefined
    },
    groupListData:{
        count:0,
        next:null,
        previous:null,
        results:undefined
    }
};

const ACCOUNT = "ACCOUNT";

export const getAccountList = createAsyncThunk<accountListDataProps,null, { rejectValue: apiErrorTypes }>(ACCOUNT + "/getAccountList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ApiConstants.ACCOUNTLIST)
            return response.data
        } catch (e: any) {
            if (e.code !== "ERR_NETWORK") {
                const error = parseErrorData(e.response)
                AppAlert(AppStrings.error, error)
            }
            return rejectWithValue(e?.response)
        }
    });

    export const createAccount = createAsyncThunk<AccountListProps,object, { rejectValue: apiErrorTypes }>(ACCOUNT + "/createAccount",
    async (params, { rejectWithValue }) => {
        const token = store.getState().AuthSlice.tokenDetail;
        try {
            const response = await axiosClient.post(ApiConstants.CREATEACCOUNT,params)
            return response.data
        } catch (e: any) {
            if (e.code !== "ERR_NETWORK") {
                const error = parseErrorData(e.response)
                AppAlert(AppStrings.error, error)
            }
            return rejectWithValue(e?.response)
        }
    });

    export const getAllGroupsList = createAsyncThunk<groupListDataProps,null, { rejectValue: apiErrorTypes }>(ACCOUNT + "/getAllGroupsList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ApiConstants.GROUPLIST)
            return response.data
        } catch (e: any) {
            if (e.code !== "ERR_NETWORK") {
                const error = parseErrorData(e.response)
                AppAlert(AppStrings.error, error)
            }
            return rejectWithValue(e?.response)
        }
    });


const AccountSlice = createSlice({
    name: ACCOUNT,
    initialState,
    reducers: {
        
    },
     extraReducers(builder) {
        // getAccountList
        builder.addCase(getAccountList.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getAccountList.fulfilled, (state, action) => {
            state.isLoading = false
            state.accountListData = action.payload
        });
        builder.addCase(getAccountList.rejected, (state) => {
            state.isLoading = false
        });
        //create Account
           builder.addCase(createAccount.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.isLoading = false
        });
        builder.addCase(createAccount.rejected, (state) => {
            state.isLoading = false
        });
          //Group List
        builder.addCase(getAllGroupsList.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getAllGroupsList.fulfilled, (state, action) => {
            state.isLoading = false
            state.groupListData = action.payload
        });
        builder.addCase(getAllGroupsList.rejected, (state) => {
            state.isLoading = false
        });
     }

});

export const { } = AccountSlice.actions;
export default AccountSlice.reducer;
