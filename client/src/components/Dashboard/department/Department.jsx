import React from 'react'
import './Department.css'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios'
import EmployeeCountByDepartment from '../../common/EmpCountByDept/EmployeeCountByDepartment';

function Department() {
  const [depdetails,setDepDetails] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/getDepDetails")
      .then(res => {setDepDetails(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this department?');
  
    if (shouldDelete) {
      axios.delete(`http://localhost:3000/deleteDept/${id}`)
        .then(res => {
          console.log(res.data);
          window.location.reload();
        })
        .catch(err => {
          console.error(`Error deleting department with ID ${id}:`, err.response?.data || err.message);
        });
    }
  };

  return (
    <div className='custom-department-container'>
      <div className='bg-dark d-flex justify-content-between px-4 py-2'>
        <h4 className='m-1 text-white'>Departments</h4>
        <Link to='/home/add-department' className='btn btn-success cur-po rounded-2 my-auto p-1 text-decoration-none'>
          Add Department
        </Link>
      </div>
      <table className="w-100 text-center table-bordered mt-3">
        <thead style={{height: '60px', backgroundColor: 'var(--primary-color)'}}>
          <tr className='text-white'>
            <th>
            Dept Id        
            </th>
            <th>
            Department        
            </th>
            <th>
            No of employees        
            </th>
            <th>
            Description
            </th>
            <th>
            Actions 
            </th>
          </tr>
        </thead>  
        <tbody style={{backgroundColor: 'var(--secondary-color)'}}>
        {depdetails.map((e)=>(
          <tr key={e._id}>
            <td>{e._id}</td>
            <td>{e.depName}</td>        
            <td>
              <EmployeeCountByDepartment departmentName={e.depName} />        
            </td>
            <td>
              {e.depDes}
            </td>
            <td className='py-2'>
              <Link to={`/home/edit-department/${e._id}`} className='p-2'>
                <button className='btn btn-warning'>Edit</button>
              </Link>
              <button className='btn btn-danger' onClick={(elem)=>handleDelete(e._id)}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Department