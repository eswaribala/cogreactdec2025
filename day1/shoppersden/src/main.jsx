import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { Provider } from 'react-redux';
import AppComponent from './App.jsx'
import { store } from './redux/store/store.jsx';

createRoot(document.getElementById('ecommerce-root')).render(
  <StrictMode>
   <BrowserRouter>
   <Provider store={store}>
     <AppComponent/>
   </Provider>
   </BrowserRouter> 
  </StrictMode>,
)