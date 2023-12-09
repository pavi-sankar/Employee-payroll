import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PayrollLog() {
    const navigate = useNavigate();
    const [empDetails, setEmpDetails] = useState([]);
    const [empId, setEmpId] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [payroll, setPayroll] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/getEmpDetails")
            .then(result => {
                setEmpDetails(result.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/getpayrollhistory", {
                    params: {
                        empId,
                        year, 
                        month, 
                    },
                });
                setPayroll(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [empId, year, month]);

    const handleClearFilter = () => {
        setEmpId('');
        setYear(new Date().getFullYear());
        setMonth(new Date().getMonth() + 1);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/deletepayroll/${id}`)
          .then(res => {
            alert('deleted payroll')
            window.location.reload();
          })
          .catch(err => {
            console.error(`Error deleting payroll with ID ${id}:`, err.response?.data || err.message);
          });
      };

  return (
    <div>
        <div className="header d-flex bg-danger text-dark">
            <h3 className="my-2 mx-auto">Payroll History</h3>
        </div>
        <div className="mt-3 mb-3">
            <div>
                <div className="d-flex justify-content-around">
                <div className='mb-3'>
                    <label htmlFor="employeeName">Employee Name: </label>
                    <select className="form-select" id="Emp-name" value={empId} onChange={(e)=>setEmpId(e.target.value)}>
                        <option value=''>All Employees</option>
                        {empDetails.map(emp => (
                        <option key={emp._id} value={emp._id}>{emp.employeeName}, {`(${emp.department})`}</option>
                        ))}
                    </select>
                </div>
                    <div className="mb-3">
                        <label htmlFor="month">Month: </label>
                        <select
                        className="form-select"
                        id='month'
                        value={month}
                        onChange={(e)=>setMonth(e.target.value)}
                        >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                            <option key={m} value={m}>
                            {new Date(0, m - 1).toLocaleString('en-US', { month: 'long' })}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="year">Year: </label>
                        <input type="number" className="form-control"
                            id="year"
                            name="year"
                            value={year}
                            onChange={(e)=>setYear(e.target.value)}/>
                    </div>
                    <div>
                        <button className='btn btn-secondary m-4' onClick={handleClearFilter}>Clear</button>
                        <button className="btn btn-danger ms-4" onClick={(e)=>{navigate('/home/payroll')}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <div className=" mt-3 p-3">
            {payroll.length === 0 ? (<h4 className='text-danger text-center'>No data exists on given inputs</h4>) : (
            <table className='w-100 table-bordered text-center'>
                <thead className='bg-dark text-primary'>
                    <tr style={{height: '60px'}}>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Month/year</th>
                        <th>Salary</th>
                        <th>Paid Salary</th>
                        <th>Absent</th>
                        <th>Payment Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='bg-light'>
                    {payroll.map((pay) => (
                    <tr key={pay._id}>
                        <td>{pay.employeeName}</td>
                        <td>{pay.department}</td>
                        <td>{pay.month}/{pay.year}</td>
                        <td>{pay.salary}</td>
                        <td>{pay.paidSalary}</td>
                        <td>{pay.absentDays}</td>
                        <td>{new Date(pay.paidDate).toLocaleString('en-US', { dateStyle: 'short' })}</td>
                        <td>
                            <button className="btn btn-danger m-2" onClick={(e)=>handleDelete(pay._id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    </div>
  )
}

export default PayrollLog