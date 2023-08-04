import store from "../store";
import {removeFromBasket} from "../feature/basket";
import {findSKUInBasket} from "./testUtils";

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
})