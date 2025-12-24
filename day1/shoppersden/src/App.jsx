import { useState } from 'react'
import Login from './components/molecules/Login/Login.jsx'
import Registration from './components/molecules/Registration/Registration.jsx'
import './App.css'
import ShopperHeader from './components/molecules/ShopperHeader/ShopperHeader.jsx';
import { Route, Routes } from 'react-router-dom';

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
            <Route path="/dashboard" element={<div>Dashboard Component</div>} />
          </Routes>
        </div>
      }
    </>
  )
}

export default App
