import {Fragment, ReactElement} from "react";
import Header from "./Header";
import {useAppDispatch, useAppSelector} from "../hooks";
import BasketItem from "./BasketItem";
import {backToShopping} from "../feature/navigation";
import {enterCreditCardNumber} from "../feature/basket";
import {Button, Divider, List, ListItem, ListItemText, TextField} from "@mui/material";
import {LocalShippingRounded, ShoppingCartRounded} from "@mui/icons-material";

export default function CheckoutView(): ReactElement {
    const dispatch = useAppDispatch();
    const items = useAppSelector(
        state => state.basket.basket
    );
    const creditCardNumber = useAppSelector(
        state => state.basket.cardNumber
    )

    function continueShopping() {
        dispatch(backToShopping())
    }

    function handleChangeCreditCardNumber(evt: any) {
        const creditCardNumber = evt.target.value;
        dispatch(enterCreditCardNumber(creditCardNumber))
    }

    const isCreditCardNumberValid = /^\d{16}$/.test(creditCardNumber);
    return (
        <Fragment>
            <Header/>
            <List sx={{width: '100%', maxWidth: 720, margin: '8px auto'}} component="nav" aria-label="mailbox folders">
                {
                    items.map(
                        (item, index) => (
                            <Fragment key={item.sku}>
                                {index > 0 && <Divider/>}
                                <ListItem>
                                    <BasketItem sku={item.sku}/>
                                </ListItem>
                            </Fragment>
                        )
                    )
                }
            </List>
            <Button
                variant='contained'
                style={{ margin: 8 }}
                onClick={continueShopping}
                startIcon={<ShoppingCartRounded/>}
            >
                Continue shopping
            </Button>
            <TextField
                label='Credit Card Number'
                onChange={handleChangeCreditCardNumber}
                value={creditCardNumber}
                error={!/^\d{16}$/.test(creditCardNumber)}
            />
            <Button
                style={{ margin: 8 }}
                variant='contained'
                onClick={() => alert('Order successful!')}
                disabled={!isCreditCardNumberValid}
                startIcon={<LocalShippingRounded/>}
            >
                Order now!
            </Button>
        </Fragment>
    );
}