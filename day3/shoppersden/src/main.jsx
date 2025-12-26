import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import AppComponent from './App.jsx'

createRoot(document.getElementById('ecommerce-root')).render(
  <StrictMode>
   <BrowserRouter>
     <AppComponent/>
   </BrowserRouter> 
  </StrictMode>,
)