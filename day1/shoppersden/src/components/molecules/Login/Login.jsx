import React from 'react';
import { Box, Button, TextField} from '@mui/material';
import { Form } from 'formik';
import './Login.css';

function Login() {

  const[userName,setUserName]=React.useState("");
  const[password,setPassword]=React.useState("");
  

  return (
    <Box sx={{ width: '100%', height: '100vh', bgcolor: "lightblue", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  
    <Form>
       <TextField fullWidth variant='outlined' label="UserName" name="userName" />
        
       
       <TextField fullWidth variant='outlined' label="Password" name="password" type="password" />
       
       <Button variant="contained" color="primary" type="submit">
        Submit
        </Button>
    </Form>


    </Box>
  )
}

export default Login;
