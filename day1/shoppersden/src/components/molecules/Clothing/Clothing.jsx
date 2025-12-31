import React from 'react';
import { useState, useEffect } from 'react';
import './Clothing.css';
import withSearchFilter from '../withSearchFilter/withSearchFilter';
import CategoryView from '../CategoryView/CategoryView';
const ClothingView = withSearchFilter(CategoryView, "Clothing");

function Clothing() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_CLOTHING_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        console.log("Clothing data fetched:", data.data);
        setClothes(data.data);
      }).catch((error) => {
        console.error('Error fetching clothing data:', error);
        setError(error);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading clothing items...</div>;
  }

  if (error) {
    return <div>Error loading clothing items: {error.message}</div>;
  }

  console.log("Rendering clothing items:", clothes);
   return <ClothingView items={clothes} />;
}



export default Clothing;
