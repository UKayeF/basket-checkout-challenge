import {Fragment, ReactElement} from "react";
import Header from "./Header";
import {useAppDispatch, useAppSelector} from "../hooks";
import ListingItem from "./ListingItem";
import {goToCheckout} from "../feature/navigation";
import {Button, Grid} from "@mui/material";
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
            <Grid container>
                {
                    listedItems.map(
                        (item) => (
                            <Grid xs={12} sm={4} md={3}>
                                <ListingItem key={item.sku} sku={item.sku}/>
                            </Grid>
                        )
                    )
                }
            </Grid>
            <Button onClick={handleGoToCheckout} variant='contained' startIcon={<ShoppingCartCheckoutRounded/>}>Go to
                Checkout</Button>
        </Fragment>
    )
}