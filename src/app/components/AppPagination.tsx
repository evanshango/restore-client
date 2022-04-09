import React, {useState} from 'react';
import {Box, Pagination, Typography, useMediaQuery} from "@mui/material";
import {IMetadata} from "../models/pagination";

interface IProps {
    meta: IMetadata
    onPageChange: (page: number) => void
}

const AppPagination = ({meta, onPageChange}: IProps) => {
    const matches = useMediaQuery("(min-width:720px)");
    const {totalPages, currentPage, totalCount, pageSize} = meta
    const [pageNumber, setPageNumber] = useState(currentPage)

    const handlePageChange = (page: number) => {
        setPageNumber(page)
        onPageChange(page)
    }
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}
             flexDirection={!matches ? 'column' : 'row'}>
            <Typography variant={'subtitle2'}>
                Displaying {(currentPage - 1) * pageSize + 1} - {currentPage * pageSize > totalCount ?
                totalCount : currentPage * pageSize} of {totalCount} items
            </Typography>
            <Pagination count={totalPages} color="secondary" onChange={(e: any, page: number) => handlePageChange(page)}
                        size={!matches ? 'medium' : 'large'} page={pageNumber} sx={{padding: '.5rem 0'}}
            />
        </Box>
    );
};

export default AppPagination;
