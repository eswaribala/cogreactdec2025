import { useState } from 'react'
import Login from './components/molecules/Login/Login.jsx'
import Registration from './components/molecules/Registration/Registration.jsx'
import './App.css'
import ShopperHeader from './components/molecules/ShopperHeader/ShopperHeader.jsx';

function App() {
  /* const [newUser, setNewUser] = useState(false);

  function handleNewUser(value){
    setNewUser(value);
  }
  let content;
  if(newUser){
    content = <Registration newUserState={handleNewUser}/>;
  } else {
    content = <Login newUserState={handleNewUser}/>;
  } */
  return (
    <>
      <ShopperHeader />
      <Login />
    </>
  )
}

export default App
