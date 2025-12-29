import React from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './Books.css';
import { Box,Chip, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

function Books() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_BOOKS_BaseURL}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data.items) ? data.items : [])
        console.log(data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [page, limit]);
  
  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>Error loading books: {error.message}</div>;
  }


  return(
    <div className="books-container">
      {
        items.length === 0 ? (
          <div>No books available.</div>
        ) : (
          <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          {
            items.map((book) => (
              <ListItem key={book.id}>
               <ListItemAvatar>
                 <MenuBookIcon/>
                </ListItemAvatar> 
               <ListItemText primary={
                  <Box>
                    <Typography variant="h6">
                      {book.title}
                    </Typography>
                    <Chip label={book.category} />
                    <Chip label={book.publishedYear} />
                  </Box>

               } secondary={
                <Box>
                     <Typography variant="body2" color="textSecondary">
                  {book.isbn}
                </Typography>
                    <Typography variant="body2" color="textSecondary">
                  {book.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: <CurrencyRupeeIcon/>{book.price}
                </Typography>
                
               
                </Box>
               }>
              
               </ListItemText>
              </ListItem>
            ))
          }
          </List>
          
          
          )
        
      }
    </div>
  );
}




export default Books;
