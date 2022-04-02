import React from 'react';
import {TextField} from "@mui/material";
import {useController, UseControllerProps} from "react-hook-form";

interface IProps extends UseControllerProps {
    label: string
}

const AppTestInput = (props: IProps) => {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <TextField {...props} {...field} fullWidth variant={'outlined'} error={!!fieldState.error}
                   helperText={fieldState.error && fieldState.error.message}/>
    );
};

export default AppTestInput;
