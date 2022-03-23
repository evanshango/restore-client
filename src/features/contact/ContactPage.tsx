import React from 'react';
import {Button, ButtonGroup, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {decrement, increment} from "./counterSlice";

const ContactPage = () => {
    const dispatch = useAppDispatch();
    const {data, title} = useAppSelector(state => state.counter)
    return (
        <>
            <Typography variant='h5'>
                {title}
            </Typography>
            <Typography variant='h6'>
                The Data is : {data}
            </Typography>
            <ButtonGroup>
                <Button variant='contained' color='error' onClick={() => dispatch(decrement(1))}>
                    Decrement
                </Button>
                <Button variant='contained' color='success' onClick={() => dispatch(increment(1))}>
                    Increment
                </Button>
                <Button variant='contained' color='info' onClick={() => dispatch(increment(5))}>
                    Increment By 5
                </Button>
            </ButtonGroup>
        </>
    );
};

export default ContactPage;
