import {Grid, TextField, Typography} from '@mui/material';
import React from 'react';
import {useFormContext} from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import {CardCvcElement, CardExpiryElement, CardNumberElement} from "@stripe/react-stripe-js";
import {StripeInput} from "./StripeInput";
import {StripeElementType} from "@stripe/stripe-js";

interface IProps {
    cardState: { elementError: { [key in StripeElementType]?: string } },
    onCardInputChange: (event: any) => void
}

const PaymentForm = ({cardState, onCardInputChange}: IProps) => {
    const {control} = useFormContext()

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <AppTextInput label={'Name on Card'} name={'nameOnCard'} control={control}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="cardNumber" label="Card number" fullWidth autoComplete="cc-number"
                               onChange={onCardInputChange} error={!!cardState.elementError.cardNumber}
                               helperText={cardState.elementError.cardNumber}
                               variant="outlined" InputLabelProps={{shrink: true}} InputProps={{
                        inputComponent: StripeInput, inputProps: {component: CardNumberElement}
                    }}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp"
                               onChange={onCardInputChange} error={!!cardState.elementError.cardExpiry}
                               helperText={cardState.elementError.cardExpiry}
                               variant="outlined" InputLabelProps={{shrink: true}} InputProps={{
                        inputComponent: StripeInput, inputProps: {component: CardExpiryElement}
                    }}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="cvv" label="CVC" fullWidth autoComplete="cc-csc" variant="outlined"
                               onChange={onCardInputChange} error={!!cardState.elementError.cardCvc}
                               helperText={cardState.elementError.cardCvc}
                               InputLabelProps={{shrink: true}} InputProps={{
                        inputComponent: StripeInput, inputProps: {component: CardCvcElement}
                    }}/>
                </Grid>
            </Grid>
        </>
    );
};

export default PaymentForm;
