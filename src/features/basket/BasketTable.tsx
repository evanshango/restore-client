import React from 'react';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {currencyFormat} from "../../app/util/util";
import {LoadingButton} from "@mui/lab";
import {addBasketItemAsync, removeBasketItemAsync} from "./basketSlice";
import {AddOutlined, DeleteOutlineOutlined, RemoveOutlined} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {IBasketItem} from "../../app/models/basket";

interface Props {
    items: IBasketItem[],
    isBasket?: boolean
}

const BasketTable = ({items, isBasket = true}: Props) => {
    const {status} = useAppSelector(state => state.basket)
    const dispatch = useAppDispatch()
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">SubTotal</TableCell>
                        {isBasket && <TableCell align="right">Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow key={item.productId} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row">
                                <Box display={'flex'} alignItems={'center'}>
                                    <img src={item.imageUrl} alt={item.name}
                                         style={{
                                             height: 50, marginRight: 20, borderRadius: '50%',
                                             border: '1px solid #dcdcdc'
                                         }}/>
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                            <TableCell align="center">
                                {isBasket && (
                                    <LoadingButton loading={status === `pendingRemoveItem${item.productId}rem`}
                                                   color={'error'}
                                                   onClick={() => dispatch(removeBasketItemAsync({
                                                       productId: item.productId,
                                                       quantity: 1,
                                                       name: 'rem'
                                                   }))}><RemoveOutlined/>
                                    </LoadingButton>
                                )}
                                <span style={{fontWeight: 'bold'}}>{item.quantity}</span>
                                {isBasket && (
                                    <LoadingButton loading={status === `pendingAddItem${item.productId}`}
                                                   color={'success'}
                                                   onClick={() => dispatch(addBasketItemAsync({
                                                       productId: item.productId
                                                   }))}><AddOutlined/>
                                    </LoadingButton>
                                )}
                            </TableCell>
                            <TableCell align="right">
                                ${((item.price / 100) * item.quantity).toFixed(2)}
                            </TableCell>
                            {isBasket && (
                                <TableCell align="right">
                                    <LoadingButton loading={status === `pendingRemoveItem${item.productId}del`}
                                                   color={'error'} onClick={() => dispatch(
                                        removeBasketItemAsync({
                                            productId: item.productId,
                                            quantity: item.quantity,
                                            name: 'del'
                                        }))}>
                                        <DeleteOutlineOutlined/>
                                    </LoadingButton>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BasketTable;
