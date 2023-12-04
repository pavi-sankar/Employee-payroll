// Sidebar.js

import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBox, faCalendar, faFileAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='custom-sidebar-container'>
      <div className="list-group vh-100 py-3">
        <div className='list-group-item py-3 '>
          <Link to="/home" className='text-decoration-none' style={{color:'var(--secondary-color)'}}>
            <FontAwesomeIcon icon={faHome}  />
            <span>Dashboard</span>
          </Link>
        </div>
        <div className='list-group-item py-3'>
          <Link to="/home/employee" className='text-decoration-none' style={{color:'var(--secondary-color)'}}>
            <FontAwesomeIcon icon={faUsers}  />
            <span>Employees</span>
          </Link>
        </div>
        <div className='list-group-item py-3'>
          <Link to="/home/department" className='text-decoration-none' style={{color:'var(--secondary-color)'}}>
            <FontAwesomeIcon icon={faBox} />
            <span>Departments</span>
          </Link>
        </div>
        <div className='list-group-item py-3'>
          <Link to="/home/attendance" className='text-decoration-none' style={{color:'var(--secondary-color)'}} >
            <FontAwesomeIcon icon={faCalendar} />
            <span>Attendence</span>
          </Link>
        </div>
        <div className='list-group-item py-3'>
          <Link to="/home/payroll" className='text-decoration-none' style={{color:'var(--secondary-color)'}} >
            <FontAwesomeIcon icon={faFileAlt} />
            <span>Payroll</span>
          </Link>
        </div>
      <div className='list-group-item py-3 mt-auto'>
        <Link to="/home/profile" className='text-decoration-none' style={{color:'var(--secondary-color)'}}>
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Sidebar;






