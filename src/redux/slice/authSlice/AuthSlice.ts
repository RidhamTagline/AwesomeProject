import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiConstants } from "../../../config/ApiConstants";
import { axiosClient } from "../../../config/Axios";
import { AppAlert } from "../../../utils/AppAlerts";
import { AppStrings } from "../../../utils/AppStrings";
import { parseErrorData } from "../../CommonSlice";

interface tokenDetailTypes {
    access: string
};

interface PermissionType {
    add: boolean;
    change: boolean;
    delete: boolean;
    view: boolean;
};

interface userDetailsTypes {
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
    groups: string[];
    user_permissions: string[];
    permissions: {
        [key: string]: PermissionType;
    }[];
};

interface initialStateTypes {
    isLoading: boolean,
    tokenDetail:string | null,
    userDetail:userDetailsTypes | undefined
};



const initialState: initialStateTypes = {
    isLoading:false,
    tokenDetail: null,
    userDetail:undefined 
};

export interface apiErrorTypes {
    data: string | string[],
};

const AUTH = "AUTH";


export const signIn = createAsyncThunk<tokenDetailTypes, FormData, { rejectValue: apiErrorTypes }>(AUTH + "/signIn",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(ApiConstants.SIGNIN,params)
            return response.data
        } catch (e: any) {
            if (e.code !== "ERR_NETWORK") {
                const error = parseErrorData(e.response)
                AppAlert(AppStrings.error, error)
            }
            return rejectWithValue(e?.response)
        }
    });

export const getUserDetails = createAsyncThunk<userDetailsTypes,null, { rejectValue: apiErrorTypes }>(AUTH + "/userDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ApiConstants.USERDETAILS)
            return response.data
        } catch (e: any) {
            if (e.code !== "ERR_NETWORK") {
                const error = parseErrorData(e.response)
                AppAlert(AppStrings.error, error)
            }
            return rejectWithValue(e?.response)
        }
    });

const AuthSlice = createSlice({
    name: AUTH,
    initialState,
    reducers: {
     resetUserDetails:(state)=>{
        state.userDetail = undefined
     }
    },
    extraReducers(builder) {
        // signIn
        builder.addCase(signIn.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.isLoading = false
            state.tokenDetail = action.payload.access
        });
        builder.addCase(signIn.rejected, (state) => {
            state.isLoading = false
        });
        // UserDetails
        builder.addCase(getUserDetails.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.userDetail = action.payload
        });
        builder.addCase(getUserDetails.rejected, (state) => {
            state.isLoading = false
        });

    },
});

export const { resetUserDetails } = AuthSlice.actions;
export default AuthSlice.reducer;
