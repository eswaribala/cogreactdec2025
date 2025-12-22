import React from 'react';
import { Box, Button, TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import * as Yup from 'yup';
import { useFormik } from 'formik'; 
import { Form } from 'formik';

import './Login.css';

function Login() {

  /* const[userName,setUserName]=React.useState("");
  const[password,setPassword]=React.useState(""); */

  const validationSchema=Yup.object({
    userName:Yup.string().required("UserName is required"),
    password:Yup.string().required("Password is required")
  })

  const formik=useFormik({
    initialValues:{
      userName:"",
      password:""
    },
    validationSchema:validationSchema,
    onSubmit:(values)=>{
      console.log("Form data",values);
      console.log("API URL:",import.meta.env.VITE_API_URL);
      const api_url=import.meta.env.VITE_API_URL;
      const jsonData={
        userName:values.userName,
        password:values.password
      }
     const jsonDataString =JSON.stringify(jsonData);
      console.log("JSON DATA STRING:",jsonDataString);
      //API CALL
      fetch(api_url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:jsonDataString
      })
      .then((response)=>response.json())
      .then((data)=>{
        console.log("Response from API:",data);        
      })
      .catch((error)=>{
        console.error("Error while calling API:",error);
      })
    }
   
  })
   
  

  return (
    <Box sx={{ width: '40%', height: '50vh', marginRight: '3%', display: 'flex', float: 'right', alignItems: 'center' }}>
  
    <form onSubmit={formik.handleSubmit} style={{width:"100%"}}>
      <fieldset className='border-purple-700 border-2 rounded-md p-4'>
        <legend className='text-xl text-center   font-semibold text-purple-700'>Login</legend>
       <TextField fullWidth variant='outlined' label="UserName" 
       name="userName" sx={{padding:"10px"}} values={formik.values.userName}
        onChange={formik.handleChange} 
         onError={formik.touched.userName && formik.errors.userName && Boolean(formik.errors.userName)}
         helperText={formik.touched.userName &&formik.errors.userName}
        
        slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
         <AccountCircleIcon />
        </InputAdornment>
      )
    }
      }} />
        
       
       <TextField fullWidth variant='outlined' label="Password" name="password" type="password"
         sx={{padding:"10px"}} values={formik.values.password} onChange={formik.handleChange} 
         onError={formik.touched.password && formik.errors.password && Boolean(formik.errors.password)}
         helperText={formik.touched.password &&formik.errors.password}
         slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <LockIcon />
        </InputAdornment>
      )
    }
  }} />
       
       <Button variant="contained" color="primary"  type="submit" sx={{margin:"10px"}}>
        Submit
        </Button>
        </fieldset>
    </form>


    </Box>
  )
}

export default Login;
