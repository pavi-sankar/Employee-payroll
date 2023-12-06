import React, { useEffect, useState } from 'react'
import './Employee.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Employee() {

  const [empDetails, setEmpDetails] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3000/getEmpDetails")
      .then(result => {setEmpDetails(result.data)
      })
      .catch(err => console.log(err));
    axios.get("http://localhost:3000/getDepDetails")
     .then(response => {setDepartments(response.data)})
     .catch(error => console.log(error))  
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/deleteEmp/${id}`)
      .then(res => {
        console.log(res.data); 
        window.location.reload();
      })
      .catch(err => {
        console.error(`Error deleting employee with ID ${id}:`, err.response?.data || err.message);
      });
  };

  const filtered = empDetails.filter(item => {
    const NameMatch = item.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    const DOBMatch = item.dob.toLowerCase().includes(searchQuery.toLowerCase());
    const DepMatch = item.department.toLowerCase().includes(searchQuery.toLowerCase());
    return NameMatch || DOBMatch || DepMatch;
  });



  return (
    <div className='conatiner-fluid'>
      <div className='custom-employee-header d-flex justify-content-around'>
        <div className='custom-employee-searchbar d-flex'>
          <input type='text' placeholder='search' value={searchQuery} className='employee-search-input' onChange={(e)=>setSearchQuery(e.target.value)}></input>
          <div className='custom-employee-search-icon'>
            <FontAwesomeIcon icon={faSearch} /> 
          </div>
        </div>
        <div className='custom-employee-dropdown'>
          <label htmlFor="dropdown">Departments </label>
          <select
            id="dropdown"
            value={searchQuery}  // Change 'departments' to 'selectedDepartment'
            onChange={(e) => setSearchQuery(e.target.value)}
            className='cur-po'
          >
            <option value="" disabled hidden>Select...</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep.depaName}>
                {dep.depName}
              </option>
            ))}
          </select>
        </div>
        <Link to='/home/add-employee' className='custom-employee-addbutton rounded-2 cur-po m-1 p-1 text-decoration-none'>add employee</Link>
      </div>
      <div className='custom-employee-table-container mt-3'>
      <table className='w-100 table-bordered'>
        <thead className='bg-secondary'>
          <tr className='text-center' style={{height:'60px'}}>
            <th style={{ width: '7%' }}>EMP ID </th>
            <th style={{ width: '18%' }}>Emp Name</th>
            <th style={{ width: '8%' }}>DOB</th>
            <th style={{ width: '13%' }}>Contact</th>
            <th style={{ width: '15%' }}>Department</th>
            <th style={{ width: '14%' }}>Job</th>
            <th style={{ width: '10%' }}>Salary</th>
            <th style={{ width: '15%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e)=>(
          <tr key={e._id} className='text-center bg-dark text-white'>
            <td>{e._id}</td>
            <td>{e.employeeName}</td>
            <td>{e.dob}</td>
            <td>{e.contact}</td>
            <td>{e.department}</td>
            <td>{e.jobTitle}</td>
            <td>{e.salary}</td>
            <td><Link to={`/home/edit-employee/${e._id}`}><button className='btn btn-warning m-2'>edit</button></Link><button onClick={(elem)=>handleDelete(e._id)} className='btn btn-danger'>delete</button></td>
          </tr>
          ))}
        </tbody>
      </table>  
      </div>
    </div>
  )
}

export default Employee