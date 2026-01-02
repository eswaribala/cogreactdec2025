import React from 'react';

import './ClothingView.css';
import Typography from '@mui/material/Typography';

function ClothingView({title,items,search,setSearch}) {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <TextField
        label="Search Clothing"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Price: $${item.price}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}



export default ClothingView;
