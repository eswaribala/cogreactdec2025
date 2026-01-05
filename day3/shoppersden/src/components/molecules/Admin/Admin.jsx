import React, { use } from 'react';

import './Admin.css';

import {Box,TextField,Button,Stack, Typography, Alert} from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addProductRequest } from '../../../redux/actions/productActions';
import { useDispatch } from 'react-redux';


function Admin() {
    const dispatch=useDispatch();
    useSelector((state)=>console.log(state));
    const {loading,error}=useSelector((state)=>state.product);
    const[form,setForm]=useState({
        name:"",
        category:"",
        price:"",
    })

    const handleChange=(e)=>{
       setForm((p=>{
        return{
            ...p,
            [e.target.name]:e.target.value
        }
        }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        // Dispatch action to add product
        const name=form.name;
        const category=form.category;
        const price=form.price;
        if(!name||!category||!price){
            return;
        }
        dispatch(addProductRequest({name,category,price}));
        setForm({
            name:"",
            category:"",
            price:"",
        });
    }
    return(
        <Box className="admin-container">
            <Typography variant="h4" gutterBottom>
                Admin Panel - Add New Product
            </Typography>
            {error && <Alert sx={{mb:2}} severity="error">{error}</Alert>}
            <Stack>
                <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField label="Product Name" name="name" value={form.name} onChange={handleChange} variant="outlined">

                </TextField>
                <TextField label="Category" name="category" value={form.category} onChange={handleChange} variant="outlined">

                </TextField>
                <TextField label="Price" name="price" value={form.price} onChange={handleChange} variant="outlined">

                </TextField>
                <Button variant="contained" color="primary" disabled={loading}>{loading?"Adding...":"Add Product"}</Button>
           
        </Box>
        </Stack>
        </Box>
    )
}



export default Admin;
