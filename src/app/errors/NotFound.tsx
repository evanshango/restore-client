import React from 'react';
import {Button, Container, Divider, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {HourglassEmptyOutlined} from "@mui/icons-material";

const NotFound = () => {
    return (
        <Container sx={{
            height: 500, textAlign: 'center', margin: 'auto', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', mt: 12,
        }}>
            <HourglassEmptyOutlined sx={{fontSize: '5rem', marginBottom: 2}} color={'secondary'}/>
            <Typography gutterBottom variant={'h5'}>Oops- we could not find what you are looking for</Typography>
            <Divider/>
            <Button component={Link} to='/catalog' variant='outlined' color='success' fullWidth size='large'
                    sx={{marginTop: 3, height: 50, borderRadius: '.5rem'}}>
                Go Back to Shop
            </Button>
        </Container>
    );
};

export default NotFound;
