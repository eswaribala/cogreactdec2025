import React from 'react';
import {useState} from 'react';
import './VerticalMenu.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';

function VerticalMenu() {
  const[value, setValue] = useState('1');

  function handleChange(event, newValue){
    setValue(newValue);
  }

  return(
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList orientation="vertical" variant="scrollable" onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: 'divider' }}>
            <Tab label="Books" value="1"></Tab>
            <Tab label="Gifts" value="2"></Tab>
            <Tab label="Clothing" value="3"></Tab>
            <Tab label="Sports" value="4"></Tab>
          </TabList>
          <TabPanel value="1">
            Books Content
            
          </TabPanel>
          <TabPanel value="2">
            Gifts Content
            
          </TabPanel>
          <TabPanel value="3">
            Clothing Content  
          </TabPanel>
          <TabPanel value="4">
            Sports Content  
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  )

}


export default VerticalMenu;
