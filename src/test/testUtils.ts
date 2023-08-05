import {RootState} from "../store";
import {BasketItem} from "../feature/basket";
import {Location} from "../feature/navigation";
import {MessageSeverity} from "../feature/snackbar";

export const findSKUInBasket = (state: RootState) =>
    (sku: number): BasketItem | undefined =>
        state.basket.basket.find(item => item.sku === sku);

export const getCreditCardNumber = (state: RootState): string =>
    state.basket.cardNumber;

export const getLocation = (state: RootState): Location => state.navigation.location

export const isSnackbarOpen = (state: RootState): boolean => state.snackbar.open;
export const getSnackbarMessage = (state: RootState): string => state.snackbar.message;
export const getSnackbarSeverity = (state: RootState): MessageSeverity => state.snackbar.severity;

export const getNumberOfLineItemsInBasket = (state: RootState): number => state.basket.basket.length;
export const getTotalAmountOfItems = (state: RootState): number => state.basket.basket.reduce(
    (qty, item) => item.quantity + qty, 0
);
