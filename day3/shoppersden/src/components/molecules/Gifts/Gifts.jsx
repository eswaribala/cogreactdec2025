import React from 'react';

import './Gifts.css';



function Gifts(){

  const[gifts, setGifts] = React.useState([]);
  const api_url=import.meta.env.VITE_GIFT_ENDPOINT;

  React.useEffect(() => {
    fetch(api_url)
      .then(response => response.json())
      .then(data => {
        setGifts(data);
        console.log("Gifts data fetched:", data);
      })
      .catch(error => console.error('Error fetching gifts:', error));
  }, []);

  return(
    <div className="gifts-container">
      <h2>Available Gifts</h2>
    </div>
  );
}


export default Gifts;
