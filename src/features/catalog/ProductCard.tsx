import React from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
    useMediaQuery
} from "@mui/material";
import {IProduct} from "../../app/models/product";
import {ShoppingCartCheckoutOutlined, VisibilityOutlined} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {currencyFormat} from "../../app/util/util";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {addBasketItemAsync} from "../basket/basketSlice";

interface Props {
    product: IProduct
}

const ProductCard = ({product}: Props) => {
    const matches = useMediaQuery("(min-width:720px)");
    const {status} = useAppSelector(state => state.basket)
    const dispatch = useAppDispatch()

    return (
        <Card>
            <CardHeader avatar={
                <Avatar sx={{bgcolor: 'secondary.main'}}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            } title={product.name} titleTypographyProps={{
                sx: {
                    fontWeight: 'bold',
                    color: 'primary.main',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: !matches ? 'auto' : '120px'
                }
            }}/>
            <CardMedia sx={{height: 140, backgroundSize: 'contain', bgcolor: '#f5f5f5'}}
                       image={product.imageUrl} title={product.name}/>
            <CardContent>
                <Typography gutterBottom color='secondary' variant="subtitle2">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <LoadingButton loading={status ===`pendingAddItem${product.id}`} size={'small'}
                               variant={'outlined'} startIcon={<ShoppingCartCheckoutOutlined/>}
                               onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                               sx={{color: '#ff0000', borderColor: '#ff0000', '&:hover': {borderColor: '#ff0000'}}}>Cart
                </LoadingButton>
                <Button size="small" variant={'outlined'} startIcon={<VisibilityOutlined/>}
                        component={Link} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>
        </Card>
    )
};

export default ProductCard;
