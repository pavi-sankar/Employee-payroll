import React from 'react'
import './Employee.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Employee() {
  return (
    <div className='conatiner-fluid'>
      <div className='custom-employee-header d-flex justify-content-around'>
        <div className='custom-employee-searchbar d-flex'>
          <input type='text' placeholder='search' className='employee-search-input'></input>
          <div className='custom-employee-search-icon'>
            <FontAwesomeIcon icon={faSearch} /> 
          </div>
        </div>
        <div className='custom-employee-dropdown'>
          <label htmlFor="dropdown">Departments </label>
          <select id="dropdown">
            <option value="" disabled hidden>Select...</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className='custom-employee-addbutton rounded-2 p-2'>add employee</div>
      </div>
      <div className='custom-employee-table-container mt-3'>
      <table className='w-100'>
        <thead>
          <tr className='text-center'>
            <th style={{ width: '10%' }}>EMP ID </th>
            <th colSpan={2} style={{ width: '30%' }}>Name</th>
            <th style={{ width: '10%' }}>DOB</th>
            <th style={{ width: '15%' }}>Department</th>
            <th style={{ width: '10%' }}>Attendance</th>
            <th style={{ width: '10%' }}>Salary</th>
            <th style={{ width: '15%' }}>Action</th>
          </tr>
          <tr className='text-center'>
            <th></th>
            <th style={{ width: '15%' }}>First name</th>
            <th style={{ width: '15%' }}>Last name</th>
          </tr>
        </thead>
      </table>  
      </div>
    </div>
  )
}

export default Employee