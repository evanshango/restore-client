import React from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import {HourglassEmptyOutlined} from "@mui/icons-material";
import BasketSummary from "./BasketSummary";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../app/store/configureStore";
import BasketTable from "./BasketTable";

const BasketPage = () => {
    const {basket} = useAppSelector(state => state.basket)

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
            <BasketTable items={basket.items}/>
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
