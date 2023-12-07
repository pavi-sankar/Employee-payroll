import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

function EditDept() {
    const navigate=useNavigate()  

    const [departmentName, setDepartmentName] = useState('');
    const [description, setDescription] = useState('');
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/getEditDept/${id}`)
          .then(response => {
            setDepartmentName(response.data.depName || '');
            setDescription(response.data.depDes|| '');
          })
          .catch(error => console.error('Error fetching user data:', error));
      }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!departmentName || !description ) {
          alert('Please fill in all fields.');
          return;
      }
      else{
        axios.put(`http://localhost:3000/edit-dept/${id}`, {
          depName: departmentName,
          depDes: description,
        })
          .then(result => {
            console.log(result.data);
            navigate("/home/department");
            window.location.reload();
            setDepartmentName('');
            setDescription('');
          })
          .catch(err => {
            console.error(err);
          });       
      }
    };
  
    const handleClear = () => {
      setDepartmentName('');
      setDescription('')
    };
  
    const handleCancel = () => {
      navigate("/home/department");
    }
  
    return (
      <div className='custom-add-department-container'>
          <div className="custom-add-container-header text-center pt-1 mb-4">
              <h3>Edit Department</h3>
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

export default EditDept