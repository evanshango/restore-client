import React from 'react';
import {TextField} from "@mui/material";
import {useController, UseControllerProps} from "react-hook-form";

interface IProps extends UseControllerProps {
    label: string
    multiline?: boolean
    rows?: number
    type?: string
}

const AppTextInput = (props: IProps) => {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <TextField {...props} {...field} fullWidth variant={'outlined'} error={!!fieldState.error} rows={props.rows}
                   multiline={props.multiline} helperText={fieldState.error?.message} type={props.type}
        />
    );
};

export default AppTextInput;

