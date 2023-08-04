import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

export interface Listing {
    sku: number,
    name: string,
    description: string,
    price: number,
    basketLimit: number
}

const initialState: Listing[] = [
    {
        "sku": 1,
        "name": "Product One",
        "description": "Product One description",
        "price": 1.11,
        "basketLimit": 5
    },
    {
        "sku": 2,
        "name": "Product Two",
        "description": "Product Two description",
        "price": 2.22,
        "basketLimit": 4
    },
    {
        "sku": 3,
        "name": "Product Three",
        "description": "Product Three description",
        "price": 3.33,
        "basketLimit": 3
    },
    {
        "sku": 4,
        "name": "Product Four",
        "description": "Product Four description",
        "price": 4.44,
        "basketLimit": 2
    },
    {
        "sku": 5,
        "name": "Product Five",
        "description": "Product Five description",
        "price": 5.55,
        "basketLimit": 1
    }
]

export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {}
})