import React, {useState} from 'react';
import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {DeleteOutline, EditOutlined} from "@mui/icons-material";
import {currencyFormat} from "../../app/util/util";
import useProducts from "../../app/hooks/useProducts";
import AppPagination from "../../app/components/AppPagination";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {removeProduct, setPageNumber} from "../catalog/catalogSlice";
import ProductForm from "./ProductForm";
import {IProduct} from "../../app/models/product";
import agent from "../../app/api/agent";
import {LoadingButton} from "@mui/lab";
import { Navigate } from 'react-router-dom';

const Inventory = () => {
    const {products, meta} = useProducts()
    const {user} = useAppSelector(state => state.account)
    const dispatch = useAppDispatch()
    const [editMode, setEditMode] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [target, setTarget] = useState(0)

    const handleSelectProduct = (product: IProduct) => {
        setSelectedProduct(product)
        setEditMode(true)
    }

    const handleDelete = (id: number) => {
        setLoading(true)
        setTarget(id)
        agent.Admin.deleteProduct(id)
            .then(() => dispatch(removeProduct(id)))
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }

    const cancelEdit = () => {
        if (selectedProduct) setSelectedProduct(undefined)
        setEditMode(false)
    }

    if (editMode) return <ProductForm product={selectedProduct} cancelEdit={cancelEdit}/>

    if (!user?.roles?.includes('Admin')) return <Navigate to={'/catalog'}/>

    return (
        <Container sx={{mt: 12, textAlign: 'center'}}>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{p: 2}} variant='h5'>Inventory</Typography>
                <Button sx={{m: 2}} size='medium' variant='contained' onClick={() => setEditMode(true)}>
                    Create
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{product.id}</TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.imageUrl} alt={product.name}
                                             style={{height: 50, marginRight: 20}}/>
                                        <span>{product.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.price)}</TableCell>
                                <TableCell align="center">{product.type}</TableCell>
                                <TableCell align="center">{product.brand}</TableCell>
                                <TableCell align="center">{product.qtyInStock}</TableCell>
                                <TableCell align="center">
                                    <Button startIcon={<EditOutlined/>} onClick={() => handleSelectProduct(product)}/>
                                    <LoadingButton loading={loading && target === product.id}
                                                   startIcon={<DeleteOutline/>} color='error'
                                                   onClick={() => handleDelete(product.id)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {meta && (
                <Box sx={{pt: 2}}>
                    <AppPagination meta={meta} onPageChange={(page: number) => dispatch(setPageNumber({page}))}/>
                </Box>
            )}
        </Container>
    );
};

export default Inventory;
