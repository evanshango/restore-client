import React from 'react';
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";

interface IProps {
    options: any[]
    onChange: (event: any) => void
    selectedValue: string
}

const RadioButtonGroup = ({options, onChange, selectedValue}: IProps) => {
    return (
        <FormControl component={'fieldset'}>
            <RadioGroup onChange={onChange} value={selectedValue}>
                {options.map(({value, label}) => (
                    <FormControlLabel value={value} control={<Radio/>} label={label} key={value}/>
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroup;
