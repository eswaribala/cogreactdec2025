import { useState } from 'react'
import Login from './components/molecules/Login/Login.jsx'
import Registration from './components/molecules/Registration/Registration.jsx'
import './App.css'
import ShopperHeader from './components/molecules/ShopperHeader/ShopperHeader.jsx';
import Dashboard from './components/organisms/Dashboard/Dashboard.jsx';
import { Route, Routes } from 'react-router-dom';
import Accounts from './components/molecules/Accounts/Accounts.jsx';
import Admin from './components/molecules/Admin/Admin.jsx';
import Books from './components/molecules/Books/Books.jsx';
import Clothing from './components/molecules/Clothing/Clothing.jsx';
import Gifts from './components/molecules/Gifts/Gifts.jsx';
import FAQ from './components/molecules/FAQ/FAQ.jsx';
import Help from './components/molecules/Help/Help.jsx';
import Home from './components/molecules/Home/Home.jsx';
import Sports from './components/molecules/Sports/Sports.jsx';

function App() {
   const [newUser, setNewUser] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleNewUser(value){
    setNewUser(value);
  }
  function handleIsLoggedIn(value){
    setIsLoggedIn(value);
  }
  let content;
  if(newUser){
    content = <Registration newUserState={handleNewUser}/>;
  } 
  if(!newUser && !isLoggedIn){
    content = <Login newUserState={handleNewUser} isLoggedInState={handleIsLoggedIn} />;
  }  
  return (
    <>
      <ShopperHeader />
      {content}
      {
        isLoggedIn && <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} >
             <Route path="accounts" element={<Accounts />} />
             <Route path="admin" element={<Admin />} />
             <Route path="books" element={<Books />} />
             <Route path="clothing" element={<Clothing />} />
             <Route path="gifts" element={<Gifts />} />
             <Route path="faqs" element={<FAQ />} />
             <Route path="help" element={<Help />} />
             <Route path="home" element={<Home />} />
             <Route path="sports" element={<Sports />} />
            </Route>
          </Routes>
        </div>
      }
    </>
  )
}

export default App
