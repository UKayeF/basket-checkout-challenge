import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type BasketItem = {
    sku: number,
    quantity: number
}

interface BasketInformation {
    basket: BasketItem[],
    cardNumber: string
}

const initialState: BasketInformation = {
    "basket": [
        {
            "sku": 1,
            "quantity": 5
        },
        {
            "sku": 3,
            "quantity": 1
        }
    ],
    "cardNumber": "4539456463019519"
};

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket(state, action: PayloadAction<number>) {
            const sku = action.payload;
            const indexOfExistingItem = state.basket.findIndex(
                (basketItem) => basketItem.sku === sku
            )
            if (indexOfExistingItem === -1) {
                state.basket.push({sku, quantity: 1});
            } else {
                const existingItem = state.basket[indexOfExistingItem];
                state.basket.splice(
                    indexOfExistingItem,
                    1,
                    {...existingItem, quantity: existingItem.quantity + 1}
                )
            }
        },
        removeFromBasket(state, action: PayloadAction<number>) {
            const sku = action.payload;
            const indexOfExistingItem = state.basket.findIndex(
                (basketItem) => basketItem.sku === sku
            )
            const existingItem = state.basket[indexOfExistingItem];
            if (existingItem.quantity > 1) {
                state.basket.splice(indexOfExistingItem, 1, {...existingItem, quantity: existingItem.quantity - 1})
            } else {
                state.basket.splice(indexOfExistingItem, 1)
            }
        },
        changeAmount(state, action: PayloadAction<{ amount: number, sku: number }>) {
            const {sku, amount} = action.payload;
            const indexOfExistingItem = state.basket.findIndex(
                (basketItem) => basketItem.sku === sku
            )
            const existingItem = state.basket[indexOfExistingItem];
            state.basket.splice(
                indexOfExistingItem,
                1,
                {...existingItem, quantity: amount}
            )
        },
        removeAllFromBasket(state, action: PayloadAction<number>) {
            const sku = action.payload;
            const indexOfExistingItem = state.basket.findIndex(
                (basketItem) => basketItem.sku === sku
            )
            state.basket.splice(indexOfExistingItem, 1)
        },
        enterCreditCardNumber(state, action: PayloadAction<string>){
            state.cardNumber = action.payload;
        }
    }
})

export const {addToBasket, removeFromBasket, changeAmount, removeAllFromBasket, enterCreditCardNumber} = basketSlice.actions;