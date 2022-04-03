import React, {useEffect, useState} from 'react';
import {Elements} from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import {loadStripe} from "@stripe/stripe-js";
import {useAppDispatch} from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import {setBasket} from "../basket/basketSlice";
import Loader from "../../app/layout/Loader";

const stripePromise = loadStripe("pk_test_51Kk95REA41SLnq8SQ8LZnizsXfaWa8HGPJ2X7Ysbfe5JJNlWubpvH4gSWrccroAxKAFfUDmZpEXpWBMThnM1kmHM003KS2ZJEm")

const CheckoutWrapper = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch])

    if (loading) return <Loader message={'Loading Checkout...'}/>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage/>
        </Elements>
    );
};

export default CheckoutWrapper;
