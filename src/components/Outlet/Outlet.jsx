import React from 'react';
import { Outlet as Routes } from 'react-router-dom';
import './Outlet.css';
import Sidebar from '../Sidebar/Sidebar';

const Outlet = () => {
  return (
    <div className="dns_manager_container">
      <div className="dns_manager_sidebar">
        <Sidebar />
      </div>
      <div className="dns_manager_content">
        <Routes />
      </div>
    </div>
  );
};

export default Outlet;
