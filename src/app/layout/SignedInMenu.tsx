import React from 'react';
import {Button, Fade, Menu, MenuItem} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../store/configureStore";
import {signout} from "../../features/account/accountSlice";
import {clearBasket} from "../../features/basket/basketSlice";
import {Link} from "react-router-dom";

const SignedInMenu = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.account)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button onClick={handleClick} color={'inherit'} sx={{typography: 'subtitle1', textTransform: 'lowercase'}}>
                {user && user.email}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to={'/orders'}>My Orders</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(signout())
                    dispatch(clearBasket())
                }}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default SignedInMenu;
