import React, { FC } from 'react';
import Navbar from './navbar';
import './layout.css';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <div className="layout">
      <div className='layout-navbar'>
        <Navbar />
      </div>
      <div className="layout-main">
          <div className='layout-content'>
            <Outlet />
          </div>
        </div>
    </div>
  );
};

export default Layout;