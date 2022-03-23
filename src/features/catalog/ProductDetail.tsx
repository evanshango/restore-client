import React, {useEffect, useState} from 'react';
import {
    Button,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
    useMediaQuery
} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import Loader from "../../app/layout/Loader";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {addBasketItemAsync, removeBasketItemAsync} from "../basket/basketSlice";
import {fetchProductAsync, productSelectors} from "./catalogSlice";

const ProductDetail = () => {
    const matches = useMediaQuery("(min-width:720px)");
    const {basket, status} = useAppSelector(state => state.basket)
    const dispatch = useAppDispatch()
    const {id} = useParams<{ id: string }>()
    const product = useAppSelector(state => productSelectors.selectById(state, id!))
    const {status: productStatus} = useAppSelector(state => state.catalog)

    const [quantity, setQuantity] = useState(0)
    const item = basket && product && basket!.items.find(i => i.productId === product!.id)

    const handleInputChange = (event: any) => {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value))
        }
    }

    const handleUpdateCart = () => {
        if (!item || quantity > item.quantity) {
            const updatedQty = item ? quantity - item.quantity : quantity
            dispatch(addBasketItemAsync({productId: product!.id, quantity: updatedQty}))
        } else {
            const updatedQty = item.quantity - quantity
            dispatch(removeBasketItemAsync({productId: product!.id, quantity: updatedQty}))
        }
    }

    useEffect(() => {
        if (typeof id === "string") {
            if (item) setQuantity(item.quantity)
            if (!product) dispatch(fetchProductAsync(parseInt(id)))
        }
    }, [id, item, dispatch, product])

    if (productStatus.includes('pending')) return <Loader message={'Loading Product...'}/>

    if (!product) return <NotFound/>

    return (
        <Grid container spacing={matches ? 6 : 0} sx={{margin: '1rem 0'}}>
            <Grid item xs={12} sm={6}>
                <img src={product.imageUrl} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant={'h4'} gutterBottom>{product.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant={'h5'} color={'secondary'}>
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in Stock</TableCell>
                                <TableCell>{product.qtyInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2} sx={{marginTop: 2}}>
                    <Grid item xs={12} md={6}>
                        <TextField variant={'outlined'} type={'number'} label={'Quantity in Cart'} fullWidth
                                   value={quantity} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LoadingButton sx={{height: '55px'}} color={'primary'} size={'large'} variant={'contained'}
                                       fullWidth loading={status.includes('pending')} onClick={handleUpdateCart}
                                       disabled={item && item.quantity === quantity || !item && quantity === 0}>
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                    {basket && basket.items.length > 0 && (
                        <Grid item xs={12} sx={{marginTop: 3}}>
                            <Button component={Link} to={'/checkout'} variant={'outlined'} color={'success'} fullWidth
                                    size={'large'}>
                                Go to Checkout ({basket && basket.items.length} items)
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductDetail;
