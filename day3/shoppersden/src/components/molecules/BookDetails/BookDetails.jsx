import React, { use } from 'react';

import './BookDetails.css';
import { Typography } from '@mui/material';

function BookDetails() {
  //route param to get bookId
  const bookId=useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(()=>{
    //fetch book details using bookId
    fetch(import.meta.env.VITE_BOOKS_BaseURL+`/${bookId}`)
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      setBookDetails(data);
      setLoading(false);
    }).catch((err)=>{
      console.log(err);
      setError(err);
      setLoading(false);
    });
  },[bookId]);

  if(loading){
    return <p>Loading...</p>;
  }
  if(error){
    return <p>Error loading book details: {error.message}</p>;
  }
  return(
    <Box>
      <Typography>{bookDetails?.id}</Typography>
      <Typography>{bookDetails?.isbn}</Typography>
      <Typography>{bookDetails?.title}</Typography>
      <Typography>{bookDetails?.author}</Typography>
      <Typography>{bookDetails?.category}</Typography>
      <Typography>{bookDetails?.price}</Typography>
       <Typography>{bookDetails?.rating}</Typography>
        <Typography>{bookDetails?.publishedYear}</Typography>
    </Box>
  )
 
}
export default BookDetails;
