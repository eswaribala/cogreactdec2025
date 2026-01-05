import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import AppComponent from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js';

createRoot(document.getElementById('ecommerce-root')).render(
  <StrictMode>
   <BrowserRouter>
   <Provider store={store}>
     <AppComponent/>
    </Provider>
   </BrowserRouter> 
  </StrictMode>,
)