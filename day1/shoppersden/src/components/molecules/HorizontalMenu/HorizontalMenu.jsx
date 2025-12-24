import React from 'react';
import {useState} from 'react';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Grid from '@mui/material/Grid';
import './HorizontalMenu.css';
import { Box } from '@mui/material';

function HorizontalMenu() {
  const[value, setValue] = useState('1');

  function handleChange(event, newValue){
    setValue(newValue);
  }

  return(
    <Box sx={{ width: '100%', height: '10vh', marginTop: '0px',marginLeft:'240px' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList orientation="horizontal" variant="scrollable" onChange={handleChange} aria-label="Horizontal tabs example" sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Home" value="1"></Tab>
            <Tab label="Admin" value="2"></Tab>
            <Tab label="Accounts" value="3"></Tab>
            <Tab label="FAQs" value="4"></Tab>
            <Tab label="Help" value="5"></Tab>
          </TabList>
       
          <TabPanel value="1">
            Home Content
            
          </TabPanel>
          <TabPanel value="2">
            Admin Content
            
          </TabPanel>
          <TabPanel value="3">
            Accounts Content  
          </TabPanel>
          <TabPanel value="4">
            FAQs Content  
          </TabPanel>
          <TabPanel value="5">
            Help Content  
          </TabPanel>
       </Box>
      </TabContext>
      </Box>
    
  )
}



export default HorizontalMenu;
