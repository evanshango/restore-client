import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Avatar, Box, Container, Grid, Paper, TextField, Typography} from '@mui/material';
import {LockOutlined} from "@mui/icons-material";
import {FieldValues, useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch} from "../../app/store/configureStore";
import {signinUser} from "./accountSlice";

const Signin = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const location: any = useLocation()

    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: "all"
    })

    const submitForm = async (data: FieldValues) => {
        try{
            await dispatch(signinUser(data))
            navigate(location.state.from.pathname || '/catalog')
        } catch (e){
            console.log('An error occurred while Logging in.')
        }
    }

    return (
        <Container component={Paper} maxWidth="sm"
                   sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}><LockOutlined/></Avatar>
            <Typography component="h1" variant="h5">Login</Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt: 1}}>
                <TextField margin="normal" fullWidth label="Username" autoFocus
                           {...register('username', {required: 'Username is required'})}
                           error={!!errors.username} helperText={errors && errors.username && errors.username.message}
                />
                <TextField margin="normal" fullWidth label="Password" type="password"
                           {...register('password', {required: 'Password is required'})}
                           error={!!errors.password} helperText={errors && errors.password && errors.password.message}
                />
                <LoadingButton loading={isSubmitting} type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}
                               disabled={!isValid}>
                    Login
                </LoadingButton>
                <Grid container sx={{textAlign: 'center', marginTop: 2}}>
                    <Grid item xs={12}>
                        <Link to="/register">
                            {"Don't have an account? Register"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Signin;
