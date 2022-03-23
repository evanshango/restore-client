import React from 'react';
import {Box, Pagination, Typography, useMediaQuery} from "@mui/material";
import {IMetadata} from "../models/pagination";

interface IProps {
    metaData: IMetadata
    onPageChange: (page: number) => void
}

const AppPagination = ({metaData, onPageChange}: IProps) => {
    const matches = useMediaQuery("(min-width:720px)");
    const {totalPages, currentPage, totalCount, pageSize} = metaData
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}
             flexDirection={!matches ? 'column' : 'row'}>
            <Typography variant={'subtitle2'}>
                Displaying {(currentPage - 1) * pageSize + 1} - {currentPage * pageSize > totalCount ?
                totalCount : currentPage * pageSize} of {totalCount} items
            </Typography>
            <Pagination count={totalPages} color="secondary" onChange={(e: any, page: number) => onPageChange(page)}
                        size={!matches ? 'medium' : 'large'} page={currentPage}
                        sx={{padding: '.5rem 0'}}
            />
        </Box>
    );
};

export default AppPagination;
