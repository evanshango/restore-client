import React from 'react';
import {IProduct} from "../../app/models/product";
import ProductCard from "./ProductCard";
import {Grid} from "@mui/material";
import {useAppSelector} from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
    products: IProduct[]
}

const ProductList = ({products}: Props) => {
    const {productsLoaded} = useAppSelector(state => state.catalog)
    return (
        <>
            <Grid container spacing={3}>
                {products.map(prod => (
                    <Grid key={prod.id} item xs={12} sm={4} md={4} lg={3}>
                        {!productsLoaded ? (
                            <ProductCardSkeleton/>
                        ) : (
                            <ProductCard product={prod}/>
                        )}
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ProductList;
