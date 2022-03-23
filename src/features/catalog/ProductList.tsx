import React from 'react';
import {IProduct} from "../../app/models/product";
import ProductCard from "./ProductCard";
import {Grid} from "@mui/material";

interface Props {
    products: IProduct[]
}

const ProductList = ({products}: Props) => {
    return (
        <>
            <Grid container spacing={3}>
                {products.map(prod => (
                    <Grid key={prod.id} item xs={12} sm={4} md={4} lg={3}>
                        <ProductCard product={prod}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ProductList;
