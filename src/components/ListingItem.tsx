import {Fragment, ReactElement} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../hooks";
import {RootState} from "../store";
import {addToBasket, removeFromBasket} from "../feature/basket";
import {Button} from "@mui/material";
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded'
import {RemoveShoppingCartRounded} from "@mui/icons-material";

const selectListingItemBySKU = (sku: number) => (state: RootState) => state.listing.find((item) => item.sku === sku);
const selectBasketItemBySKU = (sku: number) => (state: RootState) => state.basket.basket.find((item) => item.sku === sku);
export default function ListingItem({sku}: { sku: number }): ReactElement {
    const dispatch = useAppDispatch();
    const item = useAppSelector(selectListingItemBySKU(sku))
    const itemInBasket = useSelector(selectBasketItemBySKU(sku));
    if (!item) return <p>No item matches this sku: {sku}</p>
    const quantityInBasket = itemInBasket?.quantity ?? 0;
    const allowedQuantity = item.basketLimit;
    const canAddToBasket = quantityInBasket < allowedQuantity;
    const canRemoveFromBasket = quantityInBasket > 0;
    function handleAddToCart(): void {
        dispatch(addToBasket(sku))
    }
    function handleRemoveFromCart(): void {
        dispatch(removeFromBasket(sku))
    }
    return (
        <Fragment>
            <tr>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                {canAddToBasket ? <td>
                    <Button onClick={handleAddToCart} variant='contained' startIcon={<ShoppingCartRounded />}>
                        Add to Cart
                    </Button>
                </td> : <td>Maximum amount of items reached!</td>}
                {canRemoveFromBasket && <td>
                    <Button onClick={handleRemoveFromCart} variant='contained' startIcon={<RemoveShoppingCartRounded/>}>
                        Remove from Basket
                    </Button>
                </td>}
            </tr>
        </Fragment>
    )
}