import {RootState} from "../store";
import {BasketItem} from "../feature/basket";

export const findSKUInBasket = (state: RootState) =>
    (sku: number): BasketItem | undefined =>
        state.basket.basket.find(item => item.sku === sku);

export const getCreditCardNumber = (state: RootState): string =>
    state.basket.cardNumber;