import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, Container, Paper, Step, StepLabel, Stepper, Typography} from "@mui/material";
import AddressForm from "./AddressForm";
import Review from "./Review";
import PaymentForm from "./PaymentForm";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationSchema} from "./checkoutValidation";
import agent from "../../app/api/agent";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {clearBasket} from "../basket/basketSlice";
import {LoadingButton} from "@mui/lab";
import {StripeElementType} from "@stripe/stripe-js";
import {CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js";

const steps = ['Shipping', 'Review', 'Payment'];

const CheckoutPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    const {basket} = useAppSelector(state => state.basket)
    const [activeStep, setActiveStep] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0)
    const [loading, setLoading] = useState(false)
    const [cardState, setCardState] = useState<{ elementError: { [key in StripeElementType]?: string } }>({elementError: {}})
    const [cardComplete, setCardComplete] = useState<any>({cardNumber: false, cardExpiry: false, cardCvc: false})
    const [paymentSucceeded, setPaymentSucceeded] = useState(false)
    const [paymentMessage, setPaymentMessage] = useState('')

    const currentValidationSchema = validationSchema[activeStep]

    const methods = useForm({
        mode: 'all', resolver: yupResolver(currentValidationSchema)
    })

    useEffect(() => {
        agent.Account.getAddress().then(res => {
            if (res) {
                methods.reset({...methods.getValues(), ...res, saveAddress: false})
            }
        }).catch(error => {
            console.log(error)
        })
    }, [methods])

    const onCardInputChange = (event: any) => {
        setCardState({
            ...cardState, elementError: {
                ...cardState.elementError, [event.elementType]: event.error && event.error.message
            }
        })
        setCardComplete({...cardComplete, [event.elementType]: event.complete})
    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <AddressForm/>;
            case 1:
                return <Review/>;
            case 2:
                return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = async (data: FieldValues) => {
        if (activeStep === steps.length - 1) {
            await submitOrder(data)
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const submitDisabled = (): boolean => {
        const {cardCvc, cardExpiry, cardNumber} = cardComplete
        if (activeStep === steps.length - 1) {
            return !cardCvc || !cardExpiry || !cardNumber || !methods.formState.isValid
        } else {
            return !methods.formState.isValid
        }
    }

    const submitOrder = async (data: FieldValues) => {
        setLoading(true)
        const {nameOnCard, saveAddress, ...shippingAddress} = data
        if (!stripe || !elements) return //stripe is not ready
        try {
            const cardEl = elements.getElement(CardNumberElement)
            const paymentRes = await stripe.confirmCardPayment(basket?.clientSecret!, {
                payment_method: {
                    card: cardEl!,
                    billing_details: {
                        name: nameOnCard
                    }
                }
            })
            if (paymentRes.paymentIntent?.status === 'succeeded') {
                const orderNo = await agent.Orders.create({saveAddress, shippingAddress})
                setOrderNumber(orderNo)
                setPaymentSucceeded(true)
                setPaymentMessage('Thank you we have received your payment')
                setActiveStep(activeStep + 1)
                dispatch(clearBasket())
                setLoading(false)
                setTimeout(() => navigate('/orders', {state: {orderId: orderNo}}), 2500)
            } else {
                setPaymentMessage(paymentRes.error?.message!)
                setPaymentSucceeded(false)
                setLoading(false)
                setActiveStep(activeStep + 1)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <Container sx={{mt: 12}}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography sx={{p: 1, display: 'flex', alignItems: 'center'}} gutterBottom variant={'h5'}>
                    Checkout
                </Typography>
                <Button variant={'outlined'} sx={{m: 2}} size={'small'} component={Link} to={'/basket'}>
                    Back To Basket
                </Button>
            </Box>
            <FormProvider {...methods}>
                <Paper variant="outlined" sx={{my: {xs: 2, md: 3}, p: {xs: 2, md: 3}}}>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label: string) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom sx={{textTransform: 'capitalize'}}>
                                    {paymentMessage}
                                </Typography>
                                {paymentSucceeded ? (
                                    <Typography variant="subtitle1">
                                        Your order number is #{orderNumber}. We have not emailed your order
                                        confirmation, and will not send you an update when your order has shipped
                                        as this is a fake store.
                                    </Typography>
                                ) : (
                                    <Button variant={'outlined'} onClick={handleBack}>Go Back and Try Again</Button>
                                )}
                            </>
                        ) : (
                            <form onSubmit={methods.handleSubmit(handleNext)}>
                                {getStepContent(activeStep)}
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>Back</Button>
                                    )}
                                    <LoadingButton loading={loading} variant="contained" type={'submit'}
                                                   sx={{mt: 3, ml: 1}} disabled={submitDisabled()}>
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </LoadingButton>
                                </Box>
                            </form>
                        )}
                    </>
                </Paper>
            </FormProvider>
        </Container>
    );
};

export default CheckoutPage;
