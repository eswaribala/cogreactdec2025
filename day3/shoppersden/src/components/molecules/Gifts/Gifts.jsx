import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CardActions, Button,Pagination,Stack } from '@mui/material';
import './Gifts.css';



function Gifts(){

  const[gifts, setGifts] = React.useState([]);
  const[loading, setLoading] = React.useState(true);
  const[error, setError] = React.useState(null);
  const api_url=import.meta.env.VITE_GIFT_ENDPOINT;
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 10;

  React.useEffect(() => {
    fetch(api_url)
      .then(response => response.json())
      .then(data => {
        setGifts(Array.isArray(data.data) ? data.data : []);
        console.log("Gifts data fetched:", data);
        setLoading(false);

      })
      .catch(error => {
        console.error('Error fetching gifts:', error)
        setError(error);
        setLoading(false);
  });
  }, []);
  if (loading) {
    return <div>Loading gifts...</div>;
  }

  if (error) {
    return <div>Error loading gifts: {error.message}</div>;
  }
  return(
    <div className="gifts-container">
      <Grid container spacing={3}>
        {gifts.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6">No gifts available.</Typography>
          </Grid>
        ) : (
          gifts.map((gift) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={gift.id}>
              <Card className="gift-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={gift.image}
                  alt={gift.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {gift.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {gift.description}
                  </Typography>
                  <Typography variant="subtitle1" color="text.primary">
                    Price: ${gift.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Stack spacing={2} sx={{ marginTop: '20px', alignItems: 'center' }}>
        <Pagination 
          count={Math.ceil(gifts.length / itemsPerPage)} 
          page={page} 
          onChange={(event, value) => setPage(value)} 
          color="primary" 
        />
      </Stack>
    </div>
  );
}


export default Gifts;
