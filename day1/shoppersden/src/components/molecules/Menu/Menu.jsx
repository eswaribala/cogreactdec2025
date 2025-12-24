import React from 'react';
import {useState} from 'react';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Grid from '@mui/material/Grid';
import './Menu.css';
import { Box } from '@mui/material';

function Menu() {
  const[value, setValue] = useState('1');

  function handleChange(event, newValue){
    setValue(newValue);
  }

  return(
    <Box sx={{ width: '100%', height: '10vh', marginTop: '0px',marginLeft:'20px' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',marginLeft:'100px'}}>
          <TabList orientation="horizontal" variant="scrollable" onChange={handleChange} aria-label="Horizontal tabs example" sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Home" value="1"></Tab>
            <Tab label="Admin" value="2"></Tab>
            <Tab label="Accounts" value="3"></Tab>
            <Tab label="FAQ's" value="4"></Tab>
            <Tab label="Help" value="5"></Tab>
          </TabList>
       </Box>
       <Box sx={{ borderRight: 1, borderColor: 'divider', position:'absolute', top:'10vh', left:'0', height:'90vh',marginTop:'100px' }}>
         <TabList orientation="vertical" variant="scrollable" onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: 'divider' }}>
            <Tab label="Books" value="6"></Tab>
            <Tab label="Gifts" value="7"></Tab>
            <Tab label="Clothing" value="8"></Tab>
            <Tab label="Sports" value="9"></Tab>
          </TabList>
       </Box>
       <Box sx={{ marginLeft: '150px', padding: '20px', marginTop: '20px',marginLeft:'240px' }}>
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
            FAQ's Content  
          </TabPanel>
          <TabPanel value="5">
            Help Content  
          </TabPanel>
          <TabPanel value="6">
                      Books Content
                      
                    </TabPanel>
                    <TabPanel value="7">
                      Gifts Content
                      
                    </TabPanel>
                    <TabPanel value="8">
                      Clothing Content  
                    </TabPanel>
                    <TabPanel value="9">
                      Sports Content  
                    </TabPanel>
        </Box>
      </TabContext>
      </Box>
    
  )
}



export default Menu;
