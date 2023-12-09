import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';

function Payroll() {

  const [employeeId, setEmployeeId] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [result, setResult] = useState(null);
  const [empDetails,setEmpDetails] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/getEmpDetails")
      .then(resp => {setEmpDetails(resp.data)
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.get(`http://localhost:3000/calculateSalary/${employeeId}/${year}/${month}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error calculating salary:', error.response?.data || error.message);
    }
  };

  const handlePaySalary = async () => {
    try {
      const res = await axios.post('http://localhost:3000/createPayroll', {
        employeeId: result.empDetails._id,
        employeeName: result.empDetails.employeeName,
        department: result.empDetails.department,
        month: result.month,
        year: result.year,
        salary: result.empDetails.salary,
        paidSalary: result.calculatedSalary,
        absentDays: result.absentDays,
        paidDate: new Date(),
      });
      alert('Payroll created:', + res.data);
      window.location.reload();
    } catch (error) {
      alert('Error creating payroll: ' + JSON.stringify(error.response?.data || error.message));
      window.location.reload();
    }
  };

  const handleYear = (e) => {
    const currentyear = new Date().getFullYear();
    if(e.target.value<=currentyear){
      setYear(e.target.value)
    }
    else{
      alert("please select current or previous year")
    }
  }

  return (
    <div className='p-0'>
      <div className='bg-dark d-flex justify-content-between px-4 py-2'>
        <h4 className='m-1 text-white'>payroll</h4>
        <Link to='/home/payrollLog' className='btn btn-success cur-po rounded-2 my-auto p-1 text-decoration-none'>
          Payroll History
        </Link>
      </div>
      <div className='mt-3 mb-3 p-3'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Employee"> Employee :</label>
            <select className="form-select" id="Emp-name" value={employeeId} onChange={(e)=>setEmployeeId(e.target.value)}>
              <option value=''>Select Employee</option>
                {empDetails.map(emp => (
                  <option key={emp._id} value={emp._id}>{emp.employeeName}, {`(${emp.department})`}</option>
                ))}
            </select>
          </div>
          <div className="mb-3 d-flex">
            <div>
            <label htmlFor="year">Year: </label>
              <input type="number" className="form-control"
                  id="year"
                  name="year"
                  value={year}
                  onChange={handleYear}/>
            </div>
            <div className='ms-3'>
              <label htmlFor="month">Month: </label>
              <select
              className="form-select"
              id='month'
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {new Date(0, m - 1).toLocaleString('en-US', { month: 'long' })}
                </option>
              ))}
            </select>
            </div>
            <div className='m-4 ps-5'>
              <button type='submit' className="btn btn-primary">Submit</button>
              <button className="btn btn-secondary ms-4" onClick={(e)=>setEmployeeId('')}>Clear</button>
            </div>
            <div className='m-2 p-1'>
              <h4 className='text-decoration-underline'>salary slab</h4>
              <h5>15% deduction for 5 - 10 days absent in a month</h5>
              <h5>50% deduction for more than 10 days absent in a month</h5>
            </div>      
          </div>
        </form>
      </div>
      <div className="mb-3 p-3">
        {result && (
          <div className='d-flex'>
            <div>
              <h2>Salary Details:</h2>
              <h5>Name: {result.empDetails.employeeName}</h5>
              <h5>Department: {result.empDetails.department}</h5>
              <h5>Job: {result.empDetails.jobTitle}</h5>
              <h5>Salary: ${result.empDetails.salary}</h5>
              <h5>Absent Days: {result.absentDays}</h5>
              <h5>Month&Year : {result.month}/{result.year}</h5>
              <h5>Calculated Salary: ${result.calculatedSalary}</h5>
            </div>
            <div className='mx-auto my-auto'>
              <button onClick={handlePaySalary} className="btn btn-primary">Pay {result.calculatedSalary}</button>
              <button className="btn btn-danger ms-2" onClick={(e)=>{window.location.reload();}}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Payroll