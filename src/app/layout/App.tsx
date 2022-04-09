import React, {useCallback, useEffect, useState} from 'react';
import Header from "./Header";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetail from "../../features/catalog/ProductDetail";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import Loader from "./Loader";
import {useAppDispatch} from "../store/configureStore";
import {fetchBasketAsync} from "../../features/basket/basketSlice";
import Signin from "../../features/account/Signin";
import Signup from "../../features/account/Signup";
import {fetchUser} from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import OrdersPage from "../../features/orders/OrdersPage";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";

function App() {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)

    const initApp = useCallback(async () => {
        try {
            await dispatch(fetchUser())
            await dispatch(fetchBasketAsync())
        } catch (e) {
            console.log(e)
        }
    }, [dispatch])

    useEffect(() => {
        initApp().then(() => setLoading(false))
    }, [initApp])


    const [darkMode, setDarkMode] = useState(false)
    const paletteType = darkMode ? 'dark' : 'light'
    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })

    const handleThemeChange = () => setDarkMode(!darkMode)

    if (loading) return <Loader message={'Initializing App...'}/>

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer theme={'colored'} position={'bottom-right'} hideProgressBar/>
            <CssBaseline/>
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/catalog'} element={<Catalog/>}/>
                <Route path={'/catalog/:id'} element={<ProductDetail/>}/>
                <Route path={'/about'} element={<AboutPage/>}/>
                <Route path={'/contact'} element={<ContactPage/>}/>
                <Route path={'/server-error'} element={<ServerError/>}/>
                <Route path={'/basket'} element={<BasketPage/>}/>
                <Route path={'/checkout'} element={<PrivateRoute Component={CheckoutWrapper}/>}/>
                <Route path={'/orders'} element={<PrivateRoute Component={OrdersPage}/>}/>
                <Route path={'/inventory'} element={<PrivateRoute Component={Inventory}/>}/>
                <Route path={'/login'} element={<Signin/>}/>
                <Route path={'/register'} element={<Signup/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
