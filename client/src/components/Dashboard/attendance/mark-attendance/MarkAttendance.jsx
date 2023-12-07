import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function MarkAttendance() {

    const [employeeName, setEmployeeName] = useState('')
    const [empDetails, setEmpDetails] = useState([''])
    const [doa, setDOA] = useState('')
    const [attendanceStatus, setAttendanceStatus] = useState('present');
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/getEmpDetails")
          .then(result => {setEmpDetails(result.data)
          })
          .catch(err => console.log(err));
      }, []);

    const clearForm = () => {
        setEmployeeName('');
        setDOA('');
        setAttendanceStatus('');
    };    

    const handleCancel = () => {
       navigate("/home/attendance")
    };  

  return (
    <div>
        <div className="bg-dark text-primary p-2">
            <h3 className='m-2'>Mark Attendance</h3>
        </div>
        <div className="bg-secondary mt-3 text-white">
            <form className='d-flex p-5 justify-content-between'>
                <div className="mb-3">
                    <label htmlFor="employeeName" className="form-label">Employee Name</label>
                    <select className="form-select" id="Emp-name" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)}>
                        <option value="">Select Employee</option>
                        {empDetails.map(Emp => (
                        <option key={Emp._id} value={Emp.employeeName}>{Emp.employeeName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="Attendance-date" className="form-label">Date :</label>
                    <input type="date" className="form-control" id="date-attendance" value={doa} onChange={(e) => setDOA(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor='attendance-status' className='form-label'>Select Attendance Status:</label>
                    <select
                        value={attendanceStatus}
                        className='form-select'
                        onChange={(e) => setAttendanceStatus(e.target.value)}>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="holiday">Holiday</option>
                    </select>
                </div>
                <div className="mb-3 p-4">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-warning ms-2" onClick={clearForm}>Clear</button>
                    <button type="button" className="btn btn-danger ms-2" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default MarkAttendance