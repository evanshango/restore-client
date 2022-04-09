import React, {useEffect} from 'react';
import {FieldValues, useForm} from "react-hook-form";
import {Box, Button, Container, Grid, Paper, Typography, useMediaQuery} from '@mui/material';
import AppTextInput from "../../app/components/AppTextInput";
import {IProduct} from "../../app/models/product";
import useProducts from "../../app/hooks/useProducts";
import AppSelectList from "../../app/components/AppSelectList";
import AppDropzone from "../../app/components/AppDropzone";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationSchema} from "./productValidation";
import agent from "../../app/api/agent";
import {useAppDispatch} from "../../app/store/configureStore";
import {setProduct} from "../catalog/catalogSlice";
import {LoadingButton} from "@mui/lab";

interface IProps {
    product?: IProduct
    cancelEdit: () => void
}

const ProductForm = ({product, cancelEdit}: IProps) => {
    const dispatch = useAppDispatch()
    const matches = useMediaQuery("(min-width:700px)");
    const {control, reset, handleSubmit, watch, formState: {isDirty, isValid, isSubmitting}} = useForm({
        mode: 'all', resolver: yupResolver(validationSchema)
    });
    const {brands, types} = useProducts()
    const watchFile = watch('image', null)

    useEffect(() => {
        if (product && !watchFile && !isDirty) reset(product)
        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview)
        }
    }, [product, reset, watchFile, isDirty])

    const handleSubmitData = async (data: FieldValues) => {
        try {
            let response: IProduct
            if (product) {
                response = await agent.Admin.updateProduct(data)
            } else {
                response = await agent.Admin.createProduct(data)
            }
            dispatch(setProduct(response))
            cancelEdit()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container sx={{mt: 12}}>
            <Box component={Paper} sx={{p: 4}}>
                <Typography variant="h5" gutterBottom sx={{mb: 4}}>Product Details</Typography>
                <form onSubmit={handleSubmit(handleSubmitData)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <AppTextInput control={control} name='name' label='Product name'/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppSelectList control={control} name='brand' label='Brand' items={brands}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppSelectList control={control} name='type' label='Type' items={types}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppTextInput control={control} name='price' label='Price' type={'number'}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppTextInput control={control} name='qtyInStock' label='Quantity in Stock'
                                          type={'number'}/>
                        </Grid>
                        <Grid item xs={12}>
                            <AppTextInput control={control} name='description' label='Description' multiline={true}
                                          rows={4}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}
                                 flexDirection={!matches ? 'column' : 'row'}>
                                <AppDropzone control={control} name='image'/>
                                <div style={{padding: '1rem', width: '100%',}}>
                                    {watchFile ? (
                                        <div style={{display: 'flex'}}>
                                            <img src={watchFile.preview} alt="preview"
                                                 style={{maxHeight: 200, margin: 'auto'}}/>
                                        </div>
                                    ) : (
                                        <div style={{display: 'flex'}}>
                                            <img src={product?.imageUrl} alt={product?.name}
                                                 style={{maxHeight: 200, margin: 'auto'}}/>
                                        </div>
                                    )}
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                        <Button variant='contained' color={'secondary'} onClick={cancelEdit}>Cancel</Button>
                        <LoadingButton loading={isSubmitting} type={'submit'} variant='contained' color='success'
                                       disabled={!isValid}>
                            Submit
                        </LoadingButton>
                    </Box>
                </form>
            </Box>
        </Container>
    )
};

export default ProductForm;
