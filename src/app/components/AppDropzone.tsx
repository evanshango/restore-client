import React, {useCallback} from 'react';
import {useDropzone} from "react-dropzone";
import {useController, UseControllerProps} from "react-hook-form";
import {FormControl, FormHelperText, Typography, useMediaQuery} from "@mui/material";
import {UploadFileOutlined} from "@mui/icons-material";

interface IProps extends UseControllerProps {
}

const AppDropzone = (props: IProps) => {
    const matches = useMediaQuery("(min-width:700px)");
    const {fieldState, field} = useController({...props, defaultValue: null})

    const dzStyles = {
        display: 'flex',
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        alignItems: 'center',
        height: 200,
        width: matches ? 500 : 300
    }

    const dzActive = {
        borderColor: 'green'
    }

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles[0] = Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})
        field.onChange(acceptedFiles[0])
    }, [field])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <FormControl style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles} error={!!fieldState.error}>
                <input {...getInputProps()}/>
                <UploadFileOutlined sx={{fontSize: '100px'}}/>
                <Typography variant={'h5'}>Drop Image Here</Typography>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
        </div>
    );
};

export default AppDropzone;
