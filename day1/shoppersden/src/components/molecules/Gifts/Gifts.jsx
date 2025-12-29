import React from 'react';
import {
  Box, Card, CardContent, CardMedia, Typography, Grid,
  CardActions, Button, Pagination, Stack, TextField,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import './Gifts.css';



function Gifts(){

  const[gifts, setGifts] = React.useState([]);
  const[loading, setLoading] = React.useState(true);
  const[error, setError] = React.useState(null);
  const api_url=import.meta.env.VITE_GIFT_ENDPOINT;
  const [page, setPage] = React.useState(1);
  let slicedItems=0;
  let pageCount=0;
  let startIndex=0;
  let endIndex=0;

  const itemsPerPage = 5;

  // filter + sort states
  const [search, setSearch] = React.useState('');
  const [sortBy, setSortBy] = React.useState('nameAsc'); 
  const [priceRange, setPriceRange] = React.useState([0, 1000]); // default, will auto-adjust after fetch
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
  // 1) FILTER
  const filtered = gifts.filter((g) => {
    const name = (g.name ?? '').toString().toLowerCase();
    const desc = (g.description ?? '').toString().toLowerCase();
    const q = search.trim().toLowerCase();

    const matchesText = q === '' || name.includes(q) || desc.includes(q);

    const price = Number(g.price);
    const matchesPrice =
      !Number.isFinite(price) ||
      (price >= priceRange[0] && price <= priceRange[1]);

    return matchesText && matchesPrice;
  });
  // 2) SORT BY NAME
const sorted = [...filtered].sort((a, b) => {
  const nameA = (a.name ?? '').toLowerCase();
  const nameB = (b.name ?? '').toLowerCase();

  if (sortBy === 'nameAsc') {
    return nameA.localeCompare(nameB);
  }
  if (sortBy === 'nameDesc') {
    return nameB.localeCompare(nameA);
  }
  return 0;
});
  if (gifts.length > 0) {
    pageCount = Math.ceil(sorted.length / itemsPerPage);
    startIndex = (page - 1) * itemsPerPage;
    endIndex = startIndex + itemsPerPage;
    slicedItems = sorted.slice(startIndex, endIndex);
  }
  return(
    <div className="gifts-container">
       {/* Controls */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
          mb: 3
        }}>
           <TextField
          label="Search gifts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          value={sortBy}
          label="Sort By"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="nameAsc">Name: A → Z</MenuItem>
          <MenuItem value="nameDesc">Name: Z → A</MenuItem>
        </Select>
      </FormControl>
        </Box>

      <Grid container spacing={3}>
        {gifts.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6">No gifts available.</Typography>
          </Grid>
        ) : (
          slicedItems.map((gift) => (
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
