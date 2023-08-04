import store, {RootState} from "../store";
import {addToBasket, BasketItem} from "../feature/basket";

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

    const findSKUInBasket = (state: RootState) =>
        (sku: number): BasketItem | undefined =>
            state.basket.basket.find(item => item.sku === sku);
})