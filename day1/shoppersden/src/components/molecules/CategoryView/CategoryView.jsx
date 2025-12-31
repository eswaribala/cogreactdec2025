import React from 'react';
import { Box, TextField, Typography, List, ListItem,ListItemText } from "@mui/material";
import './CategoryView.css';

function CategoryView({ title, items = [], search, setSearch }) {
   // ADD THIS LINE HERE
  console.log("CategoryView received items:", items, items.length);
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {title} Component
      </Typography>

      <TextField
        fullWidth
        label={`Search ${title}`}
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
  );
}



export default CategoryView;
