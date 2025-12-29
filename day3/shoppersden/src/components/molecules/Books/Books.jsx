import React from 'react';

import './Books.css';

function Books() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);
  
  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_BOOKS_BaseURL}?_page=${page}&_limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching books:', err));
  }, [page, limit]);
}



export default Books;
