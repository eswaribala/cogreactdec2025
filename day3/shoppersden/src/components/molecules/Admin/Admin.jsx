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
        <Box sx={{p:3,maxWidth:600,margin:"auto"}}>
            <Typography variant="h4" gutterBottom sx={{mb:3,textAlign:"center"}}>
                Admin Panel - Add New Product
            </Typography>
            {error && <Alert sx={{mb:2}} severity="error">{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit}  sx={{display:"flex",flexDirection:"column",gap:2}}>
            <Stack spacing={2}>
                
                <TextField label="Product Name" name="name" value={form.name} onChange={handleChange} variant="outlined">

                </TextField>
                <TextField label="Category" name="category" value={form.category} onChange={handleChange} variant="outlined">

                </TextField>
                <TextField label="Price" name="price" value={form.price} onChange={handleChange} variant="outlined">

                </TextField>
                <Button variant="contained" color="primary" disabled={loading}>{loading?"Adding...":"Add Product"}</Button>
           
        
        </Stack>
        </Box>
        </Box>
    )
}



export default Admin;
