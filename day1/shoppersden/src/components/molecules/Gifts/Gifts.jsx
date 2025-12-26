import React from 'react';
import { useState, useEffect } from 'react';

import './Gifts.css';

function Gifts() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("API URL:",import.meta.env.VITE_GIFTS_API_URL);
  const api_url=import.meta.env.VITE_GIFTS_API_URL;
    
   useEffect(() => {
    fetch(api_url)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        console.log("API RESPONSE:", data);

        // ✅ API returns { count: 50, data: [...] }
        setGifts(Array.isArray(data.data) ? data.data : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api_url]);

 if (loading) return <h3>Loading gifts...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;
    return (
    <div style={styles.grid}>
      {gifts.length === 0 && <p>No gifts found</p>}

      {gifts.map((gift) => (
        <div key={gift.id} style={styles.card}>
          <img src={gift.image} alt={gift.name} style={styles.image} />
          <h3>{gift.name}</h3>
          <p>{gift.category}</p>
          <strong>₹ {gift.price}</strong>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    padding: "20px"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  }
};


export default Gifts;
