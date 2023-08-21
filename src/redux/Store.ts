import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonSlice from './CommonSlice';
import storage from 'redux-persist/lib/storage';
import SaleSlice from './slice/saleSlice/SaleSlice';
import AuthSlice from './slice/authSlice/AuthSlice';
import AccountSlice from './slice/accountSlice/AccountSlice';
import PaymentSlice from './slice/paymentSlice/PaymentSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const reducers = combineReducers({
    CommonSlice: CommonSlice,
    AuthSlice:AuthSlice,
    SaleSlice:SaleSlice,
    AccountSlice:AccountSlice,
    PaymentSlice:PaymentSlice,
});

export const USER_LOGOUT = 'USER_LOGOUT'
const rootReducer = (state: any, action: any) => {
    if (action.type == USER_LOGOUT) {
        storage.removeItem('persist:root')
        return reducers(undefined, action)
    }
    return reducers(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => __DEV__ ?
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(logger) : getDefaultMiddleware()
})

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
