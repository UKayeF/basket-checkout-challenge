import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {basketSlice} from "./feature/basket";
import {listingSlice} from "./feature/listing";
import {navigationSlice} from "./feature/navigation";
import {snackbarSlice} from "./feature/snackbar";

const reducer = combineReducers({
    basket: basketSlice.reducer,
    listing: listingSlice.reducer,
    navigation: navigationSlice.reducer,
    snackbar: snackbarSlice.reducer,
})
const store = configureStore({
    reducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;