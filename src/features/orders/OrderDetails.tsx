import React from 'react';
import {IOrder} from "../../app/models/order";
import {Box, Button, Grid, Typography} from "@mui/material";
import BasketTable from "../basket/BasketTable";
import {IBasketItem} from "../../app/models/basket";
import BasketSummary from "../basket/BasketSummary";
import {useNavigate} from "react-router-dom";

interface IProps {
    order: IOrder,
    setSelectedOrder: (id: number) => void
}

const OrderDetails = ({order, setSelectedOrder}: IProps) => {
    const navigate = useNavigate()
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)

    const handleBackClick = () => {
        setSelectedOrder(0)
        navigate('/orders', {state: {orderId: 0}})
    }

    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography sx={{p: 2, display: 'flex', alignItems: 'center'}} gutterBottom variant={'h6'}>
                    Order #{order.id}<small style={{color: 'green'}}> - {order.orderStatus.toUpperCase()}</small>
                </Typography>
                <Button variant={'contained'} sx={{m: 2}} size={'medium'} onClick={handleBackClick}>
                    Back To Orders
                </Button>
            </Box>
            <BasketTable items={order.orderItems as IBasketItem[]} isBasket={false}/>
            <Grid container sx={{margin: '1rem 0'}}>
                <Grid item xs={0} md={6}/>
                <Grid item xs={12} md={6}>
                    <BasketSummary subtotal={subtotal}/>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderDetails;
