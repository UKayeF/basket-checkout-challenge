import store, {RootState} from "../store";
import {
    addToBasket,
    changeAmount,
    enterCreditCardNumber,
    removeAllFromBasket,
    removeFromBasket
} from "../feature/basket";
import {findSKUInBasket, getCreditCardNumber} from "./testUtils";

describe('Basket tests', () => {
    let initialState: RootState;
    beforeEach(() => {
        initialState = store.getState();
    })
    it('should allow adding existing items', () => {
        const SKU_TO_ADD = 1;
        const itemWithSKU1 = findSKUInBasket(initialState)(SKU_TO_ADD);
        expect(itemWithSKU1?.quantity).toBe(5);

        store.dispatch(addToBasket(SKU_TO_ADD));

        const updatedState = store.getState();
        const updatedItemWithSKU1 = findSKUInBasket(updatedState)(SKU_TO_ADD);
        expect(updatedItemWithSKU1?.quantity).toBe(itemWithSKU1!.quantity + 1)
    })

    it('should allow adding new items', () => {
        const SKU_TO_ADD = 2;
        const itemWithSKU2 = findSKUInBasket(initialState)(SKU_TO_ADD);
        expect(itemWithSKU2).toBeUndefined();

        store.dispatch(addToBasket(SKU_TO_ADD));

        const updatedState = store.getState();
        const createdItem = findSKUInBasket(updatedState)(SKU_TO_ADD);
        expect(createdItem?.quantity).toBe(1)
    })

    it('should allow removing an existing item', () => {
        const SKU_TO_REMOVE = 1;
        const itemWithSKU1 = findSKUInBasket(initialState)(SKU_TO_REMOVE);
        expect(itemWithSKU1?.quantity).toBe(5);

        store.dispatch(removeFromBasket(SKU_TO_REMOVE));

        const updatedState = store.getState();
        const updatedItemWithSKU1 = findSKUInBasket(updatedState)(SKU_TO_REMOVE);
        expect(updatedItemWithSKU1?.quantity).toBe(itemWithSKU1!.quantity - 1)
    })


    it('should allow to change the amount of an item', () => {
        const SKU_TO_CHANGE_QTY = 1;
        const itemWithSKU1 = findSKUInBasket(initialState)(SKU_TO_CHANGE_QTY);
        expect(itemWithSKU1?.quantity).toBe(5);

        const TARGET_AMOUNT = 4;
        store.dispatch(changeAmount({ sku: SKU_TO_CHANGE_QTY, amount: TARGET_AMOUNT}));

        const updatedState = store.getState();
        const updatedItemWithSKU1 = findSKUInBasket(updatedState)(SKU_TO_CHANGE_QTY);
        expect(updatedItemWithSKU1?.quantity).toBe(TARGET_AMOUNT)
    })

    it('should allow to remove all items for a certain sku from basket', () => {
        const SKU_TO_REMOVE = 1;
        const itemWithSKU1 = findSKUInBasket(initialState)(SKU_TO_REMOVE);
        expect(itemWithSKU1?.quantity).toBe(5);

        store.dispatch(removeAllFromBasket(SKU_TO_REMOVE));

        const updatedState = store.getState();
        const updatedItemWithSKU1 = findSKUInBasket(updatedState)(SKU_TO_REMOVE);
        expect(updatedItemWithSKU1).toBeUndefined();
    })
});

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