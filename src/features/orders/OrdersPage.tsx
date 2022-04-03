import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {IOrder} from "../../app/models/order";
import agent from "../../app/api/agent";
import Loader from "../../app/layout/Loader";
import {currencyFormat, dateFormatter} from "../../app/util/util";
import OrderDetails from "./OrderDetails";
import {useLocation} from "react-router-dom";

const OrdersPage = () => {
    const {state}: any = useLocation()
    const [orders, setOrders] = useState<IOrder[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedOrderNo, setSelectedOrderNo] = useState(0)

    useEffect(() => {
        setSelectedOrderNo(state?.orderId)
        agent.Orders.list().then(res => setOrders(res))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [state])

    if (loading) return <Loader message={'Loading Orders...'}/>

    if (orders && selectedOrderNo > 0) return (
        <OrderDetails
            order={orders.find(o => o.id === selectedOrderNo)!}
            setSelectedOrder={setSelectedOrderNo}
        />
    )

    return (
        orders && (
            <Container sx={{mt: 12}}>
                <Typography variant={'h6'} gutterBottom>Your Orders - ({orders.length}) Items</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Order Number</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="center">Order Date</TableCell>
                                <TableCell align="center">Order Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row" align='center'>{order.id}</TableCell>
                                    <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                                    <TableCell align="center">{dateFormatter(order.orderDate)}</TableCell>
                                    <TableCell align="center" sx={{
                                        fontSize: '.8rem', color: order.orderStatus.includes('Received')
                                            ? 'green' : (order.orderStatus.includes('Pending') ? 'blue' : 'red'),
                                        fontWeight: 'bold'
                                    }}>
                                        {order.orderStatus}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant={'outlined'} sx={{fontSize: '.7rem'}} onClick={() =>
                                            setSelectedOrderNo(order.id)}>
                                            View Order
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        )
    );
};

export default OrdersPage;
