// Dashboard.jsx

import React from 'react';
import { useState,useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [employeeCount, setEmployeeCount] = useState(null);
  const [attendanceCount,setAttendanceCount] = useState(null);
  const [totalPaidSalary, setTotalPaidSalary] = useState(null);
  const [deptCount, setDeptCount] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/employeeCount')
      .then(response => {
        const count = response.data.count;
        setEmployeeCount(count);
      })
      .catch(error => console.error('Error fetching employee count', error));
      axios.get('http://localhost:3000/deptCount')
      .then(res => {
        const count = res.data.count;
        setDeptCount(count);
      })
      .catch(err => console.err('Error fetching department count', err));
      axios.get(`http://localhost:3000/getCurrentAttendance`)
      .then(respon => {
        const count = respon.data.count;
        setAttendanceCount(count);
      })
      .catch(error => console.error('Error fetching employee count', error));
      axios.get(`http://localhost:3000/totalPaidSalaryCurrentMonth`)
      .then(results => {setTotalPaidSalary(results.data.totalPaidSalary);})
      .catch(errors => console.errors('error fetching paid salary',errors));
  }, []);


  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <div>
      <h2 className='my-4'>Dashboard</h2>
      <div className="card-container d-flex justify-content-around">
        <Link to={`/home/employee`} className="card custom-dashbord-card p-2 text-center">
        {employeeCount !== null ? (
            <div><h4>Total Employees</h4><h2>{employeeCount}</h2></div>
          ) : (
            <h4>Loading...</h4>
          )}
        </Link>
        <Link to={`/home/payroll`} className="card custom-dashbord-card p-2 text-center">
          {totalPaidSalary !== null ? (
              <div><h4>salary paid</h4><h2>{totalPaidSalary}</h2></div>
            ) : (
              <h4>Loading...</h4>
            )}
        </Link>
        <Link to={`/home/department`} className="card custom-dashbord-card p-2 text-center">
        {deptCount !== null ? (
            <div><h4>Departments</h4><h2>{deptCount}</h2></div>
          ) : (
            <h4>Loading...</h4>
          )}
        </Link>
        <Link to={`/home/attendance`} className="card custom-dashbord-card p-2 text-center">
          {attendanceCount !== null ? (
              <div><h4>Attendance</h4><h2>{attendanceCount}</h2></div>
            ) : (
              <h4>Loading...</h4>
            )}
        </Link>
        <div className="card custom-dashbord-card p-2 text-center">
          <h3>{formattedDate}</h3>
          <h5>{formattedTime}</h5>
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

