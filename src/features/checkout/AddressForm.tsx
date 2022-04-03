import {Grid, Typography} from '@mui/material';
import React from 'react';
import {useFormContext} from "react-hook-form";
import AppTestInput from "../../app/components/AppTestInput";
import AppCheckbox from "../../app/components/AppCheckbox";

const AddressForm = () => {
    const {control, formState} = useFormContext()
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AppTestInput label={'Full Name'} name={'fullName'} control={control}/>
                </Grid>
                <Grid item xs={12}>
                    <AppTestInput label={'Address Line 1'} name={'address1'} control={control}/>
                </Grid>
                <Grid item xs={12}>
                    <AppTestInput label={'Address Line 2'} name={'address2'} control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTestInput label={'City'} name={'city'} control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTestInput label={'State / Province / Region'} name={'state'} control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTestInput label={'Zip / Postal code'} name={'zipCode'} control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTestInput label={'Country'} name={'country'} control={control}/>
                </Grid>
                <Grid item xs={12}>
                    <AppCheckbox
                        disabled={!formState.isDirty}
                        label={'Save this as the default Address'}
                        name={'saveAddress'} control={control}/>
                </Grid>
            </Grid>
        </>
    );
};

export default AddressForm;
