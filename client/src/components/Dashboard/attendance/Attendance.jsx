import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filter, setFilter] = useState({
    employeeName: '', // Employee name for filtering
    startDate: new Date().toISOString().split('T')[0], // Default to current date
    endDate: new Date().toISOString().split('T')[0], // Default to current date
  });

  useEffect(() => {
    // Fetch attendance data when the component mounts or when the filter changes
    fetchAttendanceData();
  }, [filter]);

  const fetchAttendanceData = async () => {
    try {
      // Make an API call to fetch attendance data based on filters
      const response = await axios.get('http://localhost:3000/getAttendance', {
        params: filter,
      });
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchAttendanceData();
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/deleteAttendance/${id}`)
      .then(res => {
        alert('deleted Attendance')
        window.location.reload();
      })
      .catch(err => {
        console.error(`Error deleting attendance with ID ${id}:`, err.response?.data || err.message);
      });
  };

  return (
    <div className='p-0'>
      <div className='bg-primary d-flex'><h3 className='mx-auto pt-2 text-white'>Attendance Log</h3> <Link to='/home/mark-attendance' className='my-auto p-2 rounded-2'><button className='btn btn-dark'>Add Attendance</button></Link></div>
      <div className="container mt-3">
        <form onSubmit={handleFilterSubmit} className="mb-3 p-5" style={{backgroundColor: 'var(--secondary-color)'}}>
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">
                Employee Name:
                <input
                  type="text"
                  className="form-control"
                  name="employeeName"
                  value={filter.employeeName}
                  onChange={handleFilterChange}
                />
              </label>
            </div>
            <div className="col-md-4">
              <label className="form-label">
                Start Date:
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={filter.startDate}
                  onChange={handleFilterChange}
                />
              </label>
            </div>
            <div className="col-md-4">
              <label className="form-label">
                End Date:
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={filter.endDate}
                  onChange={handleFilterChange}
                />
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-2">Apply Filters</button>
        </form>
        <table className="w-100 table-bordered text-center border-danger">
          <thead>
            <tr className='bg-dark text-danger' style={{height: '60px'}}>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance) => (
              <tr key={attendance._id} className='bg-secondary text-white'>
                <td>{attendance.employeeId}</td>
                <td>{attendance.employeeName}</td>
                <td>{attendance.department}</td>
                <td>{new Date(attendance.date).toLocaleDateString()}</td>
                <td>{attendance.status}</td>
                <td>
                  <button className='btn btn-danger m-2' onClick={(e)=>handleDelete(attendance._id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance