import {Fragment, ReactElement} from "react";
import Header from "./Header";
import {useAppDispatch, useAppSelector} from "../hooks";
import BasketItem from "./BasketItem";
import {backToShopping} from "../feature/navigation";
import {enterCreditCardNumber} from "../feature/basket";

export default function CheckoutView(): ReactElement {
    const dispatch = useAppDispatch();
    const items = useAppSelector(
        state => state.basket.basket
    );
    const creditCardNumber = useAppSelector(
        state => state.basket.cardNumber
    )
    function continueShopping(){
        dispatch(backToShopping())
    }
    function handleChangeCreditCardNumber(evt: any){
        const creditCardNumber = evt.target.value;
        dispatch(enterCreditCardNumber(creditCardNumber))
    }
    const isCreditCardNumberValid = /^\d{16}$/.test(creditCardNumber);
    return (
        <Fragment>
            <Header />
            {
                items.map(
                    item => <BasketItem sku={item.sku}/>
                )
            }
            <button onClick={continueShopping}>Continue shopping!</button>
            <input
                name='ccn'
                id='ccn'
                type='text'
                onChange={handleChangeCreditCardNumber}
                value={creditCardNumber}
                required pattern='\d{16}'
            />
            <label htmlFor='ccn'>Please enter your credit card number here!</label>
            <button onClick={() => alert('Order successful!')} disabled={!isCreditCardNumberValid}>Order now!</button>
        </Fragment>
    )
}