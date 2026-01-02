import React from 'react';
import {useState,useEffect} from 'react';
import ClothingView from '../../views/ClothingView/ClothingView';
import withSearchFilter from '../../../HOCs/withSearchFilter/withSearchFilter';
import './Clothing.css';

function Clothing() {
  const[clothes,setClothes]=useState([]);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState(false);
  const ClothingViewUI=withSearchFilter(ClothingView,"Clothing");
  useEffect(()=>{
    fetch(import.meta.env.VITE_CLOTHES_API)
    .then((res)=>res.json())
    .then((data)=>{
      setClothes(data.data);
      console.log(data.data);
      setLoading(false);
    })
    .catch((err) => {
      setError(true);
      setLoading(false);
    });
  },[]);

  if(loading){
    return <div>Loading...</div>;
  }

  if(error){
    return <div>Error fetching clothing data.</div>;
  }
  return <ClothingViewUI items={clothes} />;

}


export default Clothing;
