import store from "../store";
import {getLocation} from "./testUtils";
import {backToShopping, goToCheckout} from "../feature/navigation";

describe('Navigation', () => {
    it('should allow to navigate to the checkout page and back to listing', () => {
        const initialState = store.getState();
        const previousLocation = getLocation(initialState);

        expect(previousLocation).toBe('Listing');
        store.dispatch(goToCheckout())

        const updatedState = store.getState();
        const nextLocation = getLocation(updatedState);
        expect(nextLocation).toBe('Checkout');


        store.dispatch(backToShopping())
        const updatedState2 = store.getState();
        const finalLocation = getLocation(updatedState2);
        expect(finalLocation).toBe('Listing');
    })
})