import React, {useState} from 'react';
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

interface IProps {
    items: string[]
    checked?: string[]
    onChange: (items: string[]) => void
}

const CheckBoxButtons = ({items, checked, onChange}: IProps) => {
    const [checkedItems, setCheckedItems] = useState(checked || [])

    const handleChecked = (value: string) => {
        const currentIndex = checkedItems.findIndex(i => i === value)
        let newChecked: string[]
        if (currentIndex === -1) newChecked = [...checkedItems, value]
        else newChecked = checkedItems.filter(i => i !== value)
        setCheckedItems(newChecked)
        onChange(newChecked)
    }

    return (
        <FormGroup>
            {items.map(item => (
                <FormControlLabel control={
                    <Checkbox checked={checkedItems.indexOf(item) !== -1} onClick={() => handleChecked(item)}/>}
                                  label={item} key={item}
                />
            ))}
        </FormGroup>
    );
};

export default CheckBoxButtons;
