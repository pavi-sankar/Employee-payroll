// Dashboard.jsx

import React from 'react';
import { useState,useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <div>
      <h2 className='my-4'>Dashboard</h2>
      <div className="card-container d-flex justify-content-around">
        <div className="card custom-dashbord-card p-2">
          <h3>Total Employees</h3>
          <p>150</p>
        </div>
        <div className="card custom-dashbord-card p-2">
          <h3>Salary pending</h3>
          <p>$500,000</p>
        </div>
        <div className="card custom-dashbord-card p-2">
          <h3>Departments</h3>
          <p>5</p>
        </div>
        <div className="card custom-dashbord-card p-2">
          <h3>attendance</h3>
          <p>15</p>
        </div>
        <div className="card custom-dashbord-card p-2">
          <h3>{formattedDate}</h3>
          <p>{formattedTime}</p>
        </div>
      </div>
      <div className="charts">
        {/* Add charts displaying payroll data */}
        <p>Charts and graphs can go here...</p>
      </div>
    </div>
  );
};

export default Dashboard;

