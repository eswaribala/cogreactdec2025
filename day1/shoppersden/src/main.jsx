import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import AppComponent from './App.jsx'

createRoot(document.getElementById('ecommerce-root')).render(
  <StrictMode>
   <AppComponent/>
  </StrictMode>,
)