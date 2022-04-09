import React from 'react';
import ProductList from "./ProductList";
import Loader from "../../app/layout/Loader";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {setPageNumber, setParams} from "./catalogSlice";
import {Container, Grid, Paper, Typography} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckBoxButtons from "../../app/components/CheckBoxButtons";
import AppPagination from "../../app/components/AppPagination";
import useProducts from "../../app/hooks/useProducts";

const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to Low'},
    {value: 'price', label: 'Price - Low to High'}
]

const Catalog = () => {
    const {products, brands, types, filtersLoaded, meta} = useProducts()
    const {productParams} = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch()

    if (filtersLoaded !== undefined && !filtersLoaded) return <Loader message={'Loading Products...'}/>

    return (
        <Container sx={{mt: 12, textAlign: 'center'}}>
            <Grid container spacing={2} sx={{mb: 1}}>
                <Grid item xs={12} md={3}>
                    <Paper sx={{mb: 2}}>
                        <ProductSearch/>
                    </Paper>
                    <Paper sx={{mb: 2, padding: 2}}>
                        <RadioButtonGroup
                            onChange={(e) => dispatch(setParams({orderBy: e.target.value}))}
                            options={sortOptions} selectedValue={productParams.orderBy}
                        />
                    </Paper>
                    <Typography variant={'h6'} sx={{padding: 1}}>Types</Typography>
                    <Paper sx={{mb: 2, padding: 2}}>
                        <CheckBoxButtons items={types} checked={productParams.types}
                                         onChange={(items: string[]) => dispatch(setParams({types: items}))}
                        />
                    </Paper>
                    <Typography variant={'h6'} sx={{padding: 1}}>Brands</Typography>
                    <Paper sx={{mb: 2, padding: 2}}>
                        <CheckBoxButtons items={brands} checked={productParams.brands}
                                         onChange={(items: string[]) => dispatch(setParams({brands: items}))}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={9} sx={{mb: 1}}>
                    <ProductList products={products}/>
                </Grid>
                <Grid item xs={0} md={3}/>
                <Grid item xs={12} md={9}>
                    {meta && (
                        <AppPagination meta={meta} onPageChange={(page: number) => dispatch(setPageNumber({page}))}/>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Catalog;
