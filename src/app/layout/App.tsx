import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
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
import {useStoreContext} from "../context/StoreContext";
import {getCookie} from "../util/util";
import agent from "../api/agent";
import Loader from "./Loader";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import {useAppDispatch} from "../store/configureStore";
import {setBasket} from "../../features/basket/basketSlice";

function App() {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const buyerId = getCookie("buyerId")
        if (buyerId) {
            agent.Basket.get()
                .then(basket => dispatch(setBasket(basket)))
                .catch(error => console.log(error))
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [dispatch])

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
            <Container sx={{mt: 12}}>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/catalog'} element={<Catalog/>}/>
                    <Route path={'/catalog/:id'} element={<ProductDetail/>}/>
                    <Route path={'/about'} element={<AboutPage/>}/>
                    <Route path={'/contact'} element={<ContactPage/>}/>
                    <Route path={'/server-error'} element={<ServerError/>}/>
                    <Route path={'/basket'} element={<BasketPage/>}/>
                    <Route path={'/checkout'} element={<CheckoutPage/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;
