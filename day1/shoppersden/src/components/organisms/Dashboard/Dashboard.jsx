import React from 'react';
import VerticalMenu from '../../molecules/VerticalMenu/VerticalMenu.jsx';
import HorizontalMenu from '../../molecules/HorizontalMenu/HorizontalMenu.jsx';
import './Dashboard.css';

const Dashboard = () => (
  <div >
    <HorizontalMenu />
    <VerticalMenu />
  </div>
);



export default Dashboard;
