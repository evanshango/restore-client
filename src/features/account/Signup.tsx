import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Avatar, Box, Container, Grid, Paper, TextField, Typography} from '@mui/material';
import {LockOutlined} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import agent from "../../app/api/agent";
import {toast} from "react-toastify";

const Signup = () => {
    const navigate = useNavigate()

    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: "all"
    })

    const handleApiErrors = (errors: any) => {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', {message: error})
                } else if (error.includes('Email')) {
                    setError('email', {message: error})
                } else if (error.includes('Username')) {
                    setError('username', {message: error})
                }
            })
        }
    }

    return (
        <Container component={Paper} maxWidth="sm"
                   sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, mt: 12}}>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}><LockOutlined/></Avatar>
            <Typography component="h1" variant="h5">Register</Typography>
            <Box component="form"
                 onSubmit={handleSubmit((data: any) => agent.Account.signup(data)
                     .then(() => {
                         toast.success('Registration successful. You can now login')
                         navigate('/login')
                     }).catch(error => handleApiErrors(error)))}
                 noValidate sx={{mt: 1}}>
                <TextField margin="normal" fullWidth label="Username" autoFocus
                           {...register('username', {required: 'Username is required'})}
                           error={!!errors.username} helperText={errors && errors.username && errors.username.message}
                />
                <TextField margin="normal" fullWidth label="Email"
                           {...register('email', {
                                   required: 'Email is required',
                                   pattern: {
                                       value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                                       message: 'Not a valid email address'
                                   }
                               }
                           )}
                           error={!!errors.email} helperText={errors && errors.email && errors.email.message}
                />
                <TextField margin="normal" fullWidth label="Password" type="password"
                           {...register('password', {
                               required: 'Password is required',
                               pattern: {
                                   value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{quot:'?/g.l,])(?!.*\s).*$/,
                                   message: 'Password does not meet complexity requirements'
                               }
                           })}
                           error={!!errors.password} helperText={errors && errors.password && errors.password.message}
                />
                <LoadingButton loading={isSubmitting} type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}
                               disabled={!isValid}>
                    Register
                </LoadingButton>
                <Grid container sx={{textAlign: 'center', marginTop: 2}}>
                    <Grid item xs={12}>
                        <Link to="/login">
                            {"Already have an account? Login"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Signup;
