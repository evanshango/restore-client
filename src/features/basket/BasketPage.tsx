import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {AddOutlined, DeleteOutlineOutlined, HourglassEmptyOutlined, RemoveOutlined} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import BasketSummary from "./BasketSummary";
import {currencyFormat} from "../../app/util/util";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {addBasketItemAsync, removeBasketItemAsync} from "./basketSlice";

const BasketPage = () => {
    const {basket, status} = useAppSelector(state => state.basket)
    const dispatch = useAppDispatch()

    if (!basket || basket.items.length === 0) return (
        <Container sx={{
            height: 500, textAlign: 'center', margin: 'auto', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center'
        }}>
            <HourglassEmptyOutlined sx={{fontSize: '5rem', marginBottom: 2}} color={'secondary'}/>
            <Typography variant={'h5'} gutterBottom>
                Oops!! Looks like Your basket is empty
            </Typography>
            <br/>
            <Typography gutterBottom>Please click on the button below to view available items for shopping</Typography>
            <Button component={Link} to={'/catalog'} variant={'outlined'} color={'success'} sx={{marginTop: 3}}>
                Go Back to Shop
            </Button>
        </Container>
    )

    return (
        <>
            <Typography variant={'h6'} gutterBottom>Your Basket - ({basket.items.length}) Items</Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">SubTotal</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map(item => (
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
                                    <LoadingButton loading={status === `pendingRemoveItem${item.productId}rem`}
                                                   color={'error'}
                                                   onClick={() => dispatch(removeBasketItemAsync({
                                                       productId: item.productId,
                                                       quantity: 1,
                                                       name: 'rem'
                                                   }))}><RemoveOutlined/>
                                    </LoadingButton>
                                    <span style={{fontWeight: 'bold'}}>{item.quantity}</span>
                                    <LoadingButton loading={status === `pendingAddItem${item.productId}`}
                                                   color={'success'}
                                                   onClick={() => dispatch(addBasketItemAsync({
                                                       productId: item.productId
                                                   }))}><AddOutlined/>
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">
                                    ${((item.price / 100) * item.quantity).toFixed(2)}
                                </TableCell>
                                <TableCell align="right">
                                    <LoadingButton loading={status === `pendingRemoveItem${item.productId}del`}
                                                   color={'error'}
                                                   onClick={() => dispatch(removeBasketItemAsync({
                                                       productId: item.productId,
                                                       quantity: item.quantity,
                                                       name: 'del'
                                                   }))}><DeleteOutlineOutlined/>
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container sx={{margin: '1rem 0'}}>
                <Grid item xs={0} md={6}/>
                <Grid item xs={12} md={6}>
                    <BasketSummary/>
                    <Button component={Link} to={'/checkout'} variant={'contained'} color={'primary'} fullWidth
                            size={'large'} sx={{marginTop: 0}}>
                        Go to Checkout ({basket && basket.items.length} items)
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default BasketPage;
