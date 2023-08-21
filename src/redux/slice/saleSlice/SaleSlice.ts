import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppAlert } from "../../../utils/AppAlerts";
import { AppStrings } from "../../../utils/AppStrings";
import { apiErrorTypes } from "../authSlice/AuthSlice";
import { axiosClient } from "../../../config/Axios";
import { ApiConstants } from "../../../config/ApiConstants";
import { parseErrorData } from "../../CommonSlice";
import { CreatedByProps } from "../accountSlice/AccountSlice";

interface ItemgroupListProps{
    id: number,
    created_by:CreatedByProps,
    belongs_to: string | null,
    total_items: string,
    name: string,
    created_at: string,
    updated_at: string
}

interface CreateItemProps{ 
     id: number,
    created_by:CreatedByProps, 
    total: number | null,
    group: {
        id: number,
        created_by: CreatedByProps,
        belongs_to:string |  null,
        name: string,
        created_at: string,
        updated_at: string
    },
    price: number,
    silver_fine_amount: number,
    gold_fine_amount: number,
    opening_balance_total_amount: number,
    opening_balance_total_amount_choice: string,
    silver_fine_choice: string,
    gold_fine_choice: string,
    code: string,
    photo: string | null,
    item_prefix_code: string,
    units: string,
    labour_upon: string,
    stock_method:string,
    remaining: string | null,
    name: string,
    created_at: string,
    updated_at: string
}

interface groupListDataProps {
        count: number,
        next: string|null,
        previous: string|null,
        results:ItemgroupListProps[] | undefined
}

interface itemListDataProps {
        count: number,
        next: string|null,
        previous: string|null,
        results:CreateItemProps[] | undefined
}

interface initialStateTypes{
    isLoading:boolean;
    itemGroupListData:groupListDataProps;
    itemListData:itemListDataProps;
}

const initialState: initialStateTypes = {
    isLoading:false,
    itemGroupListData:{
        count:0,
        next:null,
        previous:null,
        results:undefined
    },
    itemListData:{
        count:0,
        next:null,
        previous:null,
        results:undefined
    }

};

const SALE = "SALE";

export const ItemGroupListData = createAsyncThunk<groupListDataProps,null, { rejectValue: apiErrorTypes }>(SALE + "/ItemGroupListData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ApiConstants.ITEMGROUPLIST)
            return response.data
        } catch (e: any) {
            if (e.code !== "ERR_NETWORK") {
                const error = parseErrorData(e.response)
                AppAlert(AppStrings.error, error)
            }
            return rejectWithValue(e?.response)
        }
    });

export const createItem = createAsyncThunk<groupListDataProps,object, { rejectValue: apiErrorTypes }>(SALE + "/createItem",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(ApiConstants.CREATEITEMS,params)
            return response.data
        } catch (e: any) {
            if (e.code !== "ERR_NETWORK") {
                const error = parseErrorData(e.response)
                AppAlert(AppStrings.error, error)
            }
            return rejectWithValue(e?.response)
        }
    });

export const getAllItemList = createAsyncThunk<itemListDataProps,null, { rejectValue: apiErrorTypes }>(SALE + "/getAllItemList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ApiConstants.GETALLITEMSLIST)
            return response.data
        } catch (e: any) {
            if (e.code !== "ERR_NETWORK") {
                const error = parseErrorData(e.response)
                AppAlert(AppStrings.error, error)
            }
            return rejectWithValue(e?.response)
        }
    });

export const deleteItems = createAsyncThunk<null,number, { rejectValue: apiErrorTypes }>(SALE + "/deleteItems",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.delete(ApiConstants.GETALLITEMSLIST+`/${params}`)
            return response.data
        } catch (e: any) {
            if (e.code !== "ERR_NETWORK") {
                const error = parseErrorData(e.response)
                AppAlert(AppStrings.error, error)
            }
            return rejectWithValue(e?.response)
        }
    });


const SaleSlice = createSlice({
    name: SALE,
    initialState,
    reducers: {
        deleteItemReducer:(state,action) => {
            state.itemListData = action.payload
        },
    },
     extraReducers(builder) {
        //Item Group List
        builder.addCase(ItemGroupListData.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(ItemGroupListData.fulfilled, (state, action) => {
            state.isLoading = false
            state.itemGroupListData = action.payload
        });
        builder.addCase(ItemGroupListData.rejected, (state) => {
            state.isLoading = false
        });
        //create Item
        builder.addCase(createItem.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(createItem.fulfilled, (state, action) => {
            state.isLoading = false
        });
        builder.addCase(createItem.rejected, (state) => {
            state.isLoading = false
        });
        //GET ALL ITEMS LIST
        builder.addCase(getAllItemList.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getAllItemList.fulfilled, (state, action) => {
            state.isLoading = false,
            state.itemListData = action.payload
        });
        builder.addCase(getAllItemList.rejected, (state) => {
            state.isLoading = false
        });
        //DELETE ITEM
        builder.addCase(deleteItems.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(deleteItems.fulfilled, (state, action) => {
            state.isLoading = false
        });
        builder.addCase(deleteItems.rejected, (state) => {
            state.isLoading = false
        });
     }

});

export const {deleteItemReducer } = SaleSlice.actions;
export default SaleSlice.reducer;
