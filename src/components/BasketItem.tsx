import {Fragment, ReactElement} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../hooks";
import {RootState} from "../store";
import {changeAmount, removeAllFromBasket} from "../feature/basket";

const selectListingItemBySKU = (sku: number) => (state: RootState) => state.listing.find((item) => item.sku === sku);
const selectBasketItemBySKU = (sku: number) => (state: RootState) => state.basket.basket.find((item) => item.sku === sku);
export default function BasketItem({sku}: { sku: number }): ReactElement {
    const dispatch = useAppDispatch();
    const item = useAppSelector(selectListingItemBySKU(sku))
    const itemInBasket = useSelector(selectBasketItemBySKU(sku));
    if (!itemInBasket || !item) return <></>;
    const quantityInBasket = itemInBasket?.quantity ?? 0;
    const allowedQuantity = item.basketLimit;
    const canRemoveFromBasket = quantityInBasket > 0;
    function handleChangeAmount(evt: any){
        const amount = evt.target.value
        dispatch(changeAmount({ amount, sku }));
    }
    function handleRemoveFromBasket(){
        dispatch(removeAllFromBasket(sku))
    }
    return (
        <Fragment>
            <tr>
                <td>{item.name}</td>
                <td><input value={itemInBasket?.quantity} type='number' min={1} max={allowedQuantity} onChange={handleChangeAmount}/></td>
                <td>{item.price}</td>
                {canRemoveFromBasket && <td>
                    <button onClick={handleRemoveFromBasket}>Remove all</button>
                </td>}
            </tr>
        </Fragment>
    )
}
