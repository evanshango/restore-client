import {Grid, Typography} from '@mui/material';
import React from 'react';
import BasketTable from "../basket/BasketTable";
import BasketSummary from "../basket/BasketSummary";
import {useAppSelector} from "../../app/store/configureStore";

const Review = () => {
    const {basket} = useAppSelector(state => state.basket)
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            {basket && <BasketTable items={basket.items} isBasket={false}/>}
            <Grid container sx={{margin: '1rem 0'}}>
                <Grid item xs={0} md={6}/>
                <Grid item xs={12} md={6}>
                    <BasketSummary/>
                </Grid>
            </Grid>
        </>
    );
};

export default Review;
