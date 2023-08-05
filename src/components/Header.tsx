import {Fragment, ReactElement} from "react";
import {useAppSelector} from "../hooks";
import {Listing} from "../feature/listing";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

function getPriceForSKU(sku: number, listing: Listing[]): number {
    const listingItem = listing.find(listingItem => listingItem.sku === sku);
    return listingItem?.price ?? NaN;
}

export default function Header(): ReactElement {
    const basketItems = useAppSelector(state => state.basket.basket);
    const listings = useAppSelector(state => state.listing);
    const numberOfItems = basketItems.reduce((amount, item) => +amount + +item.quantity, 0)
    const totalCost = basketItems.reduce(
        (amount, item) => amount + item.quantity * getPriceForSKU(item.sku, listings), 0)
    const itemText = numberOfItems > 0 ? `${numberOfItems} items - ${totalCost.toFixed(2)}€` : 'No items in cart yet - 0.00€'
    return (
        <Box sx={{flexGrow: 1}} style={{ marginBottom: '32px'}}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='subtitle1'>
                        {itemText}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )

}