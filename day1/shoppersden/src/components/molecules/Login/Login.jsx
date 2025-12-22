import React from 'react';
import { Box, Button, TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/People';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import showPassword from '@mui/icons-material/Visibility';
import handleClickShowPassword from '@mui/icons-material/VisibilityOff';

import { useFormik } from 'formik'; 
import { Form } from 'formik';
import './Login.css';

function Login() {

  const[userName,setUserName]=React.useState("");
  const[password,setPassword]=React.useState("");
   

  return (
    <Box sx={{ width: '40%', height: '50vh', marginRight: '3%', display: 'flex', float: 'right', alignItems: 'center' }}>
  
    <form>
      <fieldset className='border-purple-700 border-2 rounded-md p-4'>
        <legend className='text-xl text-center   font-semibold text-purple-700'>Login</legend>
       <TextField fullWidth variant='outlined' label="UserName" 
       name="userName" sx={{padding:"10px"}}  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
         <AccountCircle />
        </InputAdornment>
      )
    }
      }} />
        
       
       <TextField fullWidth variant='outlined' label="Password" name="password" type="password"
         sx={{padding:"10px"}}  slotProps={{
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
