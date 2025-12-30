import React from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './Books.css';
import { Box,Chip, List, ListItem, ListItemAvatar, ListItemText, Paper,Pagination,Stack,Typography } from '@mui/material';

function Books() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(4);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
   const [totalPages, setTotalPages] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  
  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_BOOKS_BaseURL}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data.items) ? data.items : [])
        setTotalItems(data.totalItems || 0);
        setTotalPages(data.totalPages || 1);
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
          <Box sx={{ p: 1 }}>
  <Paper elevation={2} sx={{ p: 1.5, borderRadius: 2 }}>
           <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
          <Typography variant="h5" fontWeight={700}>
            Books
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Total: <b>{totalItems}</b> • Page <b>{page}</b> / <b>{totalPages}</b> • Limit <b>{limit}</b>
          </Typography>
        </Box>
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
      </Paper>
          </Box>
          
          )
        
      }
       <Stack spacing={2} sx={{ marginTop: '10px', marginBottom: '10px', alignItems: 'center' }}>
        <Pagination 
          count={totalPages}
          page={page} 
          onChange={(event, value) => setPage(value)} 
          color="primary" 
           disabled={loading || totalPages <= 1}
        />
      </Stack>
    </div>
  );
}




export default Books;
