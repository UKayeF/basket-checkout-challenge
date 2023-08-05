import {ReactElement, useEffect} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../hooks";
import {RootState} from "../store";
import {addToBasket, removeFromBasket} from "../feature/basket";
import {Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {AddShoppingCartRounded, RemoveShoppingCartRounded} from "@mui/icons-material";
import {createSnackbar} from "../feature/snackbar";

const selectListingItemBySKU = (sku: number) => (state: RootState) => state.listing.find((item) => item.sku === sku);
const selectBasketItemBySKU = (sku: number) => (state: RootState) => state.basket.basket.find((item) => item.sku === sku);
export default function ListingItem({sku}: { sku: number }): ReactElement {
    const dispatch = useAppDispatch();
    const item = useAppSelector(selectListingItemBySKU(sku))
    const itemInBasket = useSelector(selectBasketItemBySKU(sku));
    const quantityInBasket = itemInBasket?.quantity ?? 0;
    const allowedQuantity = item?.basketLimit ?? 0;
    const canAddToBasket = item && quantityInBasket < allowedQuantity;
    const canRemoveFromBasket = quantityInBasket > 0;
    useEffect(() => {
        if (!canAddToBasket){
            dispatch(createSnackbar({
                severity: 'info',
                message: 'Maximum amount for given item reached!',
            }))
        }
    }, [canAddToBasket, dispatch])
    if (!item) return <p>No item matches this sku: {sku}</p>
    function handleAddToCart(): void {
        dispatch(addToBasket(sku))
    }
    function handleRemoveFromCart(): void {
        dispatch(removeFromBasket(sku))
    }
    return (
        <Card sx={{ minWidth: 275, width: 300, margin: '8px auto' }} variant='outlined'>
            <CardContent>
                <Typography variant='h5'>
                    {item.name}
                </Typography>
                <Typography variant='subtitle1'>
                    {item.description}
                </Typography>

            </CardContent>
            <CardActions>
                <Grid container>
                    <Grid xs={12} style={{margin: 8}}>
                        <Button disabled={!canAddToBasket} onClick={handleAddToCart} variant='contained' startIcon={<AddShoppingCartRounded />}>
                            <Typography variant='h6' style={{ marginRight: 8 }}>
                                {item.price}€
                            </Typography>
                            <Typography variant='subtitle2'>
                                Add to Cart
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid xs={12} style={{margin: 8}}>
                        <Button disabled={!canRemoveFromBasket} onClick={handleRemoveFromCart} variant='text' startIcon={<RemoveShoppingCartRounded/>}>
                            Remove from Basket
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}