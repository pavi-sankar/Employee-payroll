import React from 'react';
import './Home.css'
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/common/header/Header';
import { Outlet } from 'react-router-dom';

function Home() {
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 p-0">
          <Sidebar />
        </div>
        <div className="col p-0" >
          <Header className="fixed-top" />
          <div className='p-3' style={{ maxHeight: '93vh', overflowY: 'auto' }}>
            <Outlet />
          </div> 
        </div>
      </div>
    </div>
  );
} 

export default Home;
