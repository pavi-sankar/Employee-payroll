import React from 'react'
import './Department.css'

function Department() {
  return (
    <div className='custom-department-container'>
      <div className='custom-department-header d-flex justify-content-between px-4 py-2'>
        <h4 className='m-1'>Departments</h4>
        <div className='custom-depatment-header-adddepartment rounded-2 my-auto p-1'>
          Add Department
        </div>
      </div>
      <div className="custom-department-details">
        <ul className='custom-department-ul-list mt-2 p-0'>
          <li className='d-flex py-2'>
            <div className='abs-center col-2'>
              <h5>Department</h5>        
            </div>
            <div className='abs-center col-2'>
              <h6>No of employees</h6>        
            </div>
            <div className='col-6 abs-center'>
              Description
            </div>
            <div className='col-1 abs-center'>
              Base Salary
            </div>
            <div className='col-1 abs-center'>
              Actions
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Department