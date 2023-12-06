import React from 'react'
import './AddDepartment.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function AddDepartment() {
  const navigate=useNavigate()  

  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const [designation, setDesignation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!departmentName || !description || !designation) {
        alert('Please fill in all fields.');
        return;
    }
    else{
      axios.post(`http://localhost:3000/add-dept`, {
        depName: departmentName,
        depDes: description,
        designation: designation,
      })
        .then(result => {
          console.log(result.data);
          navigate("/home/department");
          window.location.reload();
          setDepartmentName('');
          setDescription('');
          setDesignation('');
        })
        .catch(err => {
          console.error(err);
        });       
    }
  };

  const handleClear = () => {
    setDepartmentName('');
    setDescription('')
    setDesignation('') 
  };

  const handleCancel = () => {
    navigate("/home/department");
  }

  return (
    <div className='custom-add-department-container'>
        <div className="custom-add-container-header text-center pt-1 mb-4">
            <h3>Add Department</h3>
        </div>
        <div className="custom-add-department-body p-3">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="departmentName" className="form-label">
                Department Name:
            </label>
            <input
                type="text"
                className="form-control"
                id="departmentName"
                name="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">
                Description:
            </label>
            <textarea
                className="form-control"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <div className="mb-5">
            <label htmlFor="designation" className="form-label">
                Designations :
            </label>
            <input
                type="text"
                className="form-control"
                id="designation"
                name="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
            />
            </div>
            <div className='d-flex justify-content-around w-25'>
                <button type="submit" className="btn btn-primary">
                Submit
                </button>
                <button
                type="button"
                className="btn btn-dark ms-2"
                onClick={handleClear}
                >
                Clear
                </button>
                <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={handleCancel}
                >
                Cancel
                </button>
            </div>
        </form>   
        </div>
    </div>
  )
}

export default AddDepartment;