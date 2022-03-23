import React from 'react'
import {Backdrop, Box, CircularProgress, Typography} from "@mui/material"

interface Props {
    message?: string
}

const Loader = ({message = "Please wait..."}: Props) => {
    return (
        <Backdrop open={true} invisible={true}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
                <CircularProgress size={100} color={'secondary'}/>
                <Typography variant={'h6'} sx={{justifyContent: 'center', position: 'fixed', top: '60%'}}>
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    )
}

export default Loader
