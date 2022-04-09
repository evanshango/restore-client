import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from '@mui/material';
import React from 'react';
import {useController, UseControllerProps} from "react-hook-form";

interface IProps extends UseControllerProps {
    label: string
    items: string[]
}

const AppSelectList = (props: IProps) => {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>{props.label}</InputLabel>
            <Select value={field.value} label={props.label} onChange={field.onChange}>
                {props.items.map((item: string, index: number) => (
                    <MenuItem value={item} key={index}>{item}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
};

export default AppSelectList;
