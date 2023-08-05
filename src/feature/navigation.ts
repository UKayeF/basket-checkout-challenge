import {createSlice} from "@reduxjs/toolkit";

export type Location = 'Listing' | 'Checkout';
export interface Navigation {
    location: Location
}

const initialState: Navigation = {
    location: "Listing"
}

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        goToCheckout(state){
            state.location = 'Checkout'
        },
        backToShopping(state) {
            state.location = 'Listing'
        }
    }
})

export const { goToCheckout, backToShopping } = navigationSlice.actions;