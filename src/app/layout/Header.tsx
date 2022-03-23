import React from 'react';
import {
    AppBar,
    Badge,
    Box,
    Container,
    IconButton,
    List,
    ListItem,
    Switch,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";
import {Link, NavLink} from "react-router-dom";
import {ShoppingCart} from "@mui/icons-material";
import {useAppSelector} from "../store/configureStore";

interface Props {
    darkMode: boolean
    handleThemeChange: () => void
}

const midLinks = [
    {title: 'Catalog', path: '/catalog'},
    {title: 'About', path: '/about'},
    {title: 'Contact', path: '/contact'}
]

const rightLinks = [
    {title: 'Login', path: '/login'},
    {title: 'Register', path: '/register'},
]

const navStyles = {
    textDecoration: 'none',
    color: 'inherit', typography: 'subtitle1', '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

const Header = ({darkMode, handleThemeChange}: Props) => {
    const matches = useMediaQuery("(min-width:720px)");
    const {basket} = useAppSelector(state => state.basket)
    const itemsCount = basket!.items.length
    return (
        <AppBar position='fixed'>
            <Container>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography variant={matches ? 'h6' : 'body2'} component={NavLink} to={'/'}
                                    sx={{color: 'inherit', textDecoration: 'none'}}>
                            RE-STORE
                        </Typography>
                        <Switch checked={darkMode} onChange={handleThemeChange}/>
                    </Box>
                    <List sx={{display: 'flex'}}>
                        {midLinks.map(({title, path}) => (
                            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                    <Box display={'flex'} alignItems={'center'}>
                        <IconButton size={'large'} sx={{color: 'inherit'}} component={Link} to={'/basket'}>
                            <Badge badgeContent={itemsCount > 0 ? itemsCount : '0'} color={'secondary'}>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                        <List sx={{display: 'flex'}}>
                            {rightLinks.map(({title, path}) => (
                                <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
