import {combineReducers, configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../features/auth/AuthSlice'
import ProductSlice from '../features/products/ProductSlice'
import UserSlice from '../features/user/UserSlice'
import CategoriesSlice from '../features/categories/CategoriesSlice'
import CartSlice from '../features/cart/CartSlice'
import AddressSlice from '../features/address/AddressSlice'
import ReviewSlice from '../features/review/ReviewSlice'
import OrderSlice from '../features/order/OrderSlice'
import WishlistSlice from '../features/wishlist/WishlistSlice'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";


const rootReducer = combineReducers({
    AuthSlice,
    ProductSlice,
    UserSlice,
    CategoriesSlice,
    CartSlice,
    AddressSlice,
    ReviewSlice,
    OrderSlice,
    WishlistSlice
});

const persistConfig = {
    key:"root",
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store);