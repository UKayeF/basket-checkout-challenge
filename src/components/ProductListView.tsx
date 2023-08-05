import {Fragment, ReactElement} from "react";
import Header from "./Header";
import {useAppDispatch, useAppSelector} from "../hooks";
import ListingItem from "./ListingItem";
import {goToCheckout} from "../feature/navigation";
import {Button} from "@mui/material";
import {ShoppingCartCheckoutRounded} from "@mui/icons-material";

export default function ProductListView(): ReactElement {
    const listedItems = useAppSelector(
        state => state.listing
    )
    const dispatch = useAppDispatch();

    function handleGoToCheckout() {
        dispatch(goToCheckout())
    }

    return (
        <Fragment>
            <Header/>
            {
                listedItems.map(
                    (item) => <ListingItem key={item.sku} sku={item.sku}/>
                )
            }
            <Button onClick={handleGoToCheckout} variant='contained' startIcon={<ShoppingCartCheckoutRounded/>}>Go to
                Checkout</Button>
        </Fragment>
    )
}