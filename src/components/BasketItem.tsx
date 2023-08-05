import {Fragment, ReactElement} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../hooks";
import {RootState} from "../store";
import {changeAmount, removeAllFromBasket} from "../feature/basket";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";

const selectListingItemBySKU = (sku: number) => (state: RootState) => state.listing.find((item) => item.sku === sku);
const selectBasketItemBySKU = (sku: number) => (state: RootState) => state.basket.basket.find((item) => item.sku === sku);
export default function BasketItem({sku}: { sku: number }): ReactElement {
    const dispatch = useAppDispatch();
    const item = useAppSelector(selectListingItemBySKU(sku))
    const itemInBasket = useSelector(selectBasketItemBySKU(sku));
    if (!itemInBasket || !item) return <></>;
    const allowedQuantity = item.basketLimit;

    function handleChangeAmount(evt: any) {
        const amount = evt.target.value
        dispatch(changeAmount({amount, sku}));
    }

    function handleRemoveFromBasket() {
        dispatch(removeAllFromBasket(sku))
    }

    return (
        <Fragment>
            <Grid container>
                <Grid item xs={3}>
                    <Typography variant='h5'>
                        {item.name}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label='Quantity'
                        variant='outlined'
                        inputProps={{type: 'number', min: 1, max: allowedQuantity }}
                        style={{width: 100}}
                        value={itemInBasket?.quantity}
                        onChange={handleChangeAmount}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Typography variant='h6'>
                        {item.price}€
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Button  variant='contained' onClick={handleRemoveFromBasket} startIcon={<Delete/>}>
                        Remove all
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    )
}
