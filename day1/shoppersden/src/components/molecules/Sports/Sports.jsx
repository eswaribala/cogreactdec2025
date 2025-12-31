import React from 'react';
import{useState, useEffect} from 'react';
import './Sports.css';
import useSimpleCategory from '../SimpleCategory/SimpleCategory';
import { Box, Typography, TextField, List, ListItem,ListItemText} from '@mui/material';
function Sports() {
  const[sports, setSports] = useState([]);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);
  const { title, search, setSearch, items } = useSimpleCategory("Sports", sports);
  useEffect(() => {
    fetch(import.meta.env.VITE_SPORTS_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        console.log("Sports data fetched:", data);
        setSports(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching sports data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading sports items...</div>;
  }

  if (error) {
    return <div>Error loading sports items: {error.message}</div>;
  }

 
    console.log("Rendering sports items:", sports);
  
  
  return (
     <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {title} Component
      </Typography>

      <TextField
        fullWidth
        label="Search Sports"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <List>
  {items.map((item) => (
    <ListItem key={item.id} divider>
      <ListItemText
        primary={item.name}
        secondary={`${item.category} • ₹${item.price}`}
      />
    </ListItem>
  ))}
</List>
    </Box>
    )
    
  

  }

export default Sports;
