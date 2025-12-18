import React,{useState,useEffect} from 'react';

import './Timer.css';

function Timer(){
// state management for current time
const [currentTime, setCurrentTime] = useState(new Date());

// useEffect to update time every second
useEffect(() => {
  const timerID = setInterval(() => setCurrentTime(new Date()), 1000);
  return () => clearInterval(timerID);

})

 return(
    <h4>{currentTime.toLocaleTimeString()}</h4>
 )

}

export default Timer;
