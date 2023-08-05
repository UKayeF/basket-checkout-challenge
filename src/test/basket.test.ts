import store, {RootState} from "../store";
import {
    addToBasket,
    BasketItem,
    changeAmount,
    enterCreditCardNumber,
    removeAllFromBasket,
    removeFromBasket
} from "../feature/basket";
import {findSKUInBasket, getCreditCardNumber} from "./testUtils";
import exp from "constants";

describe('Adding to basket', () => {
    it('should work for existing products', () => {
        const SKU_TO_ADD = 1;
        // Initialize the store and ensure the setup is correct
        const initialState = store.getState();
        const itemWithSKU1 = findSKUInBasket(initialState)(SKU_TO_ADD);
        expect(itemWithSKU1?.quantity).toBe(5);

        // Dispatch the add to basket action
        store.dispatch(addToBasket(SKU_TO_ADD));

        // Expect the quantity to be incremented by 1
        const updatedState = store.getState();
        const updatedItemWithSKU1 = findSKUInBasket(updatedState)(SKU_TO_ADD);
        expect(updatedItemWithSKU1?.quantity).toBe(itemWithSKU1!.quantity + 1)
    })

    it('should work for new products', () => {
        const SKU_TO_ADD = 2;
        // Initialize the store and ensure the setup is correct
        const initialState = store.getState();
        const itemWithSKU2 = findSKUInBasket(initialState)(SKU_TO_ADD);
        expect(itemWithSKU2).toBeUndefined();

        // Dispatch the add to basket action
        store.dispatch(addToBasket(SKU_TO_ADD));

        // Expect the quantity to be 1
        const updatedState = store.getState();
        const createdItem = findSKUInBasket(updatedState)(SKU_TO_ADD);
        expect(createdItem?.quantity).toBe(1)
    })

})

describe('Remove from basket', () => {
    it('should remove an existing item from the basket', () => {
        const SKU_TO_REMOVE = 1;
        // Initialize the store and ensure the setup is correct
        const initialState = store.getState();
        const itemWithSKU1 = findSKUInBasket(initialState)(SKU_TO_REMOVE);
        expect(itemWithSKU1?.quantity).toBe(5);

        // Dispatch the add to basket action
        store.dispatch(removeFromBasket(SKU_TO_REMOVE));

        // Expect the quantity to be decremented by 1
        const updatedState = store.getState();
        const updatedItemWithSKU1 = findSKUInBasket(updatedState)(SKU_TO_REMOVE);
        expect(updatedItemWithSKU1?.quantity).toBe(itemWithSKU1!.quantity - 1)
    })
});

describe('Change amount', () => {
    it('should be able to change the amount of an item', () => {
        const SKU_TO_CHANGE_QTY = 1;
        // Initialize the store and ensure the setup is correct
        const initialState = store.getState();
        const itemWithSKU1 = findSKUInBasket(initialState)(SKU_TO_CHANGE_QTY);
        expect(itemWithSKU1?.quantity).toBe(5);

        // Dispatch the add to basket action
        const TARGET_AMOUNT = 4;
        store.dispatch(changeAmount({ sku: SKU_TO_CHANGE_QTY, amount: TARGET_AMOUNT}));

        // Expect the quantity to be decremented by 1
        const updatedState = store.getState();
        const updatedItemWithSKU1 = findSKUInBasket(updatedState)(SKU_TO_CHANGE_QTY);
        expect(updatedItemWithSKU1?.quantity).toBe(TARGET_AMOUNT)
    })
})

describe('Remove all from basket', () => {
    it('should be able to remove all items for a certain sku from basket', () => {
        const SKU_TO_REMOVE = 1;
        // Initialize the store and ensure the setup is correct
        const initialState = store.getState();
        const itemWithSKU1 = findSKUInBasket(initialState)(SKU_TO_REMOVE);
        expect(itemWithSKU1?.quantity).toBe(5);

        // Dispatch the add to basket action
        store.dispatch(removeAllFromBasket(SKU_TO_REMOVE));

        // Expect the quantity to be decremented by 1
        const updatedState = store.getState();
        const updatedItemWithSKU1 = findSKUInBasket(updatedState)(SKU_TO_REMOVE);
        expect(updatedItemWithSKU1).toBeUndefined();
    })
})

describe('Credit card number', () => {
    it('should be able to be changed', () => {
        const initialState = store.getState();
        const TARGET_CREDIT_CARD_NUMBER = '1234';
        const creditCardNumber = getCreditCardNumber(initialState);
        expect(creditCardNumber).not.toBe(TARGET_CREDIT_CARD_NUMBER);

        // Dispatch the add to basket action
        store.dispatch(enterCreditCardNumber(TARGET_CREDIT_CARD_NUMBER));

        // Expect the quantity to be decremented by 1
        const updatedState = store.getState();
        const updatedCreditCardNumber = getCreditCardNumber(updatedState);
        expect(updatedCreditCardNumber).toBe(TARGET_CREDIT_CARD_NUMBER);
    })
})