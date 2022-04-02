import React from 'react';
import {useController, UseControllerProps} from "react-hook-form";
import {Checkbox, FormControlLabel} from "@mui/material";

interface IProps extends UseControllerProps {
    label: string,
    disabled: boolean
}

const AppCheckbox = (props: IProps) => {
    const {field} = useController({...props, defaultValue: false})
    return (
        <FormControlLabel
            control={<Checkbox {...field} checked={field.value} color={'secondary'}/>}
            label={props.label}
            disabled={props.disabled}
        />
    );
};

export default AppCheckbox;
