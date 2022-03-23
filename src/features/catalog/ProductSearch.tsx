import React, {useState} from 'react';
import {debounce, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {setParams} from "./catalogSlice";

const ProductSearch = () => {

    const {productParams} = useAppSelector(state => state.catalog)
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm)
    const dispatch = useAppDispatch()

    const debouncedSearch = debounce((event: any) => {
        dispatch(setParams({searchTerm: event.target.value}))
    }, 1500)

    return (
        <TextField
            label={'Search Products'}
            variant={'outlined'}
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value)
                debouncedSearch(event)
            }}/>
    );
};

export default ProductSearch;
