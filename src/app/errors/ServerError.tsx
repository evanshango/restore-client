import React from 'react';
import {Button, Container, Divider, Paper, Typography} from "@mui/material";
import {Link, useLocation} from "react-router-dom";

const ServerError = () => {
    const {state}: any = useLocation()
    return (
        <Container component={Paper} sx={{padding: '1rem', mt: 12}}>
            {state && state.detail !== '' ? (
                <>
                    <Typography variant={'h4'} color={'error'} gutterBottom>{state.title}</Typography>
                    <Divider sx={{marginBottom: '1rem'}}/>
                    <Typography>{state.detail || 'Internal Server error'}</Typography>
                </>
            ) : (
                <Typography variant={'h5'} gutterBottom>Server Error</Typography>
            )}
            <Divider sx={{margin: '1rem 0'}}/>
            <Button variant={'outlined'} component={Link} to={'/catalog'} sx={{margin: '1rem 0'}}>
                Go Back to Store
            </Button>
        </Container>
    );
};

export default ServerError;
