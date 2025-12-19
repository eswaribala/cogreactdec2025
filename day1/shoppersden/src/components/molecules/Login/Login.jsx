import React from 'react';
import { Box, Button, TextField} from '@mui/material';
import { Form } from 'formik';
import './Login.css';

function Login() {

  const[userName,setUserName]=React.useState("");
  const[password,setPassword]=React.useState("");


  return (
    <Box sx={{ width: '50%', height: '40vh',  display: 'flex', float: 'right', alignItems: 'center' }}>
  
    <form>
      <fieldset className='border-purple-700 border-2 rounded-md p-4'>
        <legend className='text-xl font-semibold text-purple-700 align-middle'>Login</legend>
       <TextField fullWidth variant='outlined' label="UserName" name="userName" />
        
       
       <TextField fullWidth variant='outlined' label="Password" name="password" type="password" />
       
       <Button variant="contained" color="primary" type="submit">
        Submit
        </Button>
        </fieldset>
    </form>


    </Box>
  )
}

export default Login;
