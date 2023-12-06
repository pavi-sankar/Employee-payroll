import React from 'react'
import './Department.css'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios'

function Department() {
  const [depdetails,setDepDetails] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/getDepDetails")
      .then(res => {setDepDetails(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/deleteDept/${id}`)
      .then(res => {
        console.log(res.data); 
        window.location.reload();
      })
      .catch(err => {
        console.error(`Error deleting department with ID ${id}:`, err.response?.data || err.message);
      });
  };

  return (
    <div className='custom-department-container'>
      <div className='custom-department-header d-flex justify-content-between px-4 py-2'>
        <h4 className='m-1'>Departments</h4>
        <Link to='/home/add-department' className='custom-depatment-header-adddepartment cur-po rounded-2 my-auto p-1 text-decoration-none'>
          Add Department
        </Link>
      </div>
      <div className="custom-department-details">
        <ul className='custom-department-ul-head mt-2 p-0'>
          <li className='d-flex py-2'>
            <div className='abs-center col-1 pt-1'>
              <h5>Dept Id</h5>        
            </div>
            <div className='abs-center col-2 pt-1'>
              <h5>Department</h5>        
            </div>
            <div className='abs-center col-1 pt-1'>
              <h5>No of employees</h5>        
            </div>
            <div className='col-5 abs-center'>
              <h5>Description</h5>
            </div>
            <div className='col-1 abs-center'>
              <h5>Designations</h5>
            </div>
            <div className='col-2 abs-center'>
              <h5>Actions</h5> 
            </div>
          </li>
        </ul>  
        <ul className='custom-department-ul-list p-0'>
        {depdetails.map((e)=>(
          <li key={e._id} className='d-flex py-2 border-top border-dark border-1'>
            <div className='abs-center col-1 pt-1 overflow-hidden'>
              <div>{e._id}</div>        
            </div>
            <div className='abs-center col-2 pt-1'>
              <div>{e.depName}</div>        
            </div>
            <div className='abs-center col-1 pt-1'>
              <h6>No of employees</h6>        
            </div>
            <div className='col-5 abs-center'>
              {e.depDes}
            </div>
            <div className='col-1 abs-center'>
              {e.designation}
            </div>
            <div className='col-2 abs-center'>
              <Link to={`/home/edit-department/${e._id}`} className='p-2'>
                <button className='btn custom-add-dept-edit-btn'>Edit</button>
              </Link>
              <button className='btn custom-add-dept-delete-btn' onClick={(elem)=>handleDelete(e._id)}>Delete</button>
            </div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Department