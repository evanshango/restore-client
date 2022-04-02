import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {currencyFormat} from "../../app/util/util";
import {useAppSelector} from "../../app/store/configureStore";
import {IBasketItem} from "../../app/models/basket";

interface IProps {
    subtotal?: any
}

const BasketSummary = ({subtotal}: IProps) => {
    const {basket} = useAppSelector(state => state.basket)
    if (!subtotal) {
        subtotal = basket && basket!.items.reduce((s: number, i: IBasketItem) => s + (i.quantity * i.price), 0)
    }
    const deliveryFee = subtotal && subtotal! > 10000 ? 0 : 500;
    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>SubTotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal!)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery Fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal! + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};

export default BasketSummary;
