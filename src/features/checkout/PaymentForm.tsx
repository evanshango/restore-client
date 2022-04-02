import {Checkbox, FormControlLabel, Grid, TextField, Typography} from '@mui/material';
import React from 'react';
import {useFormContext} from "react-hook-form";
import AppTestInput from "../../app/components/AppTestInput";

const PaymentForm = () => {
    const {control} = useFormContext()
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <AppTestInput label={'Name on Card'} name={'nameOnCard'} control={control}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="cardNumber" label="Card number" fullWidth autoComplete="cc-number"
                               variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp"
                               variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="cvv" label="CVV" helperText="Last three digits on signature strip"
                               fullWidth autoComplete="cc-csc" variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel control={<Checkbox color="secondary" name="saveCard" value="yes"/>}
                                      label="Remember credit card details for next time"
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default PaymentForm;
