import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';
import {Provider} from "react-redux";
import store from "../store";
import {getNumberOfLineItemsInBasket, getTotalAmountOfItems} from "./testUtils";

test('renders learn react link', () => {
    render(
        <Provider store={store}>
            <App/>
        </Provider>
    );
    const linkElement = screen.getByText((content, element) => {
        const initialState = store.getState();
        const numberOfItems = getNumberOfLineItemsInBasket(initialState);
        const totalAmountOfItems = getTotalAmountOfItems(initialState);
        return content.includes(`You have ${numberOfItems} line items with a total quantity of ${totalAmountOfItems}!`);
    });
    expect(linkElement).toBeInTheDocument();
});
