import React from 'react'
import './AddEmployee.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AddEmployee() {
  const [employeeName, setEmployeeName] = useState('');
  const [dob, setDOB] = useState('');
  const [contact, setContact] = useState('');
  const [department, setDepartment] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch departments
    axios.get('http://localhost:3000/getDepDetails')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employeeName || !dob || !contact || !department || !jobTitle || !salary) {
      alert('Please fill in all fields.');
      return;
    }

    const employeeData = {
      employeeName,
      dob,
      contact,
      department,
      jobTitle,
      salary,
    };

    axios.post('http://localhost:3000/postEmployee', employeeData)
      .then(response => {
        alert("Employee added")
        clearForm();
      })
      .catch(error => console.error('Error adding employee:', error));
  };

  const clearForm = () => {
    setEmployeeName('');
    setDOB('');
    setContact('');
    setDepartment('');
    setJobTitle('');
    setSalary('');
  };

  const handleCancel = () => {
    navigate("/home/employee")
  };


  return (
    <div className='custom-add-employee-container'>
      <div className="custom-add-emp-header bg-primary text-white pt-2 p-1">
        <h3>Add Employee</h3>
      </div>
      <div className="custom-add-emp-form mt-2 p-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="employeeName" className="form-label">Employee Name</label>
          <input type="text" className="form-control" id="employeeName" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">Date of Birth</label>
          <input type="date" className="form-control" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact</label>
          <input type="text" className="form-control" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <select className="form-select" id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map(dep => (
              <option key={dep._id} value={dep.depName}>{dep.depName}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">Job Title</label>
          <input type="text" className="form-control" id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input type="number" className="form-control" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={clearForm}>Clear</button>
          <button type="button" className="btn btn-danger ms-2" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default AddEmployee