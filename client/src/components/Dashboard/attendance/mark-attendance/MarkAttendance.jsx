import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function MarkAttendance() {

    const [empId, setEmpId] = useState('all')
    const [empDetails, setEmpDetails] = useState([])
    const [doa, setDOA] = useState('')
    const [attendanceStatus, setAttendanceStatus] = useState("present");
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/getEmpDetails")
          .then(result => {setEmpDetails(result.data)
          })
          .catch(err => console.log(err));
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        if(!doa){
            setResponseMessage("please select date");
            return;
        }
        axios.post('http://localhost:3000/markAttendance', {
          employeeId: empId,
          date: doa,
          status: attendanceStatus,
        })
        .then((response) => {
          setResponseMessage(response.data.message);
          clearForm();
          setTimeout(() => {
            setResponseMessage('');
          }, 3000);
        })
        .catch((error) => {
          setResponseMessage('Error marking attendance. Please try again.');
          setTimeout(() => {
            setResponseMessage('');
          }, 3000);
        });
      };      

    const clearForm = () => {
        setEmpId('all');
        setDOA('');
        setAttendanceStatus('present');
    };    

    const handleCancel = () => {
       navigate("/home/attendance")
    };
    
    const handleHoliday = (e) => {
        setAttendanceStatus(e.target.value)
        if(e.target.value=='holiday'){
            setEmpId('all')
        }
    }

    const handleEmp = (e) => {
        setEmpId(e.target.value)
        if(e.target.value!='all'){
            setAttendanceStatus("present")
        }
    }

    const handleDate = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
      
        if (selectedDate > currentDate) {
          alert("Please select a current or past date.");
        } else {
            setDOA(selectedDate);
        }
      };

  return (
    <div>
        <div className="bg-dark text-primary p-2">
            <h3 className='m-2'>Mark Attendance</h3>
        </div>
        <div className="bg-secondary mt-3 text-white">
            <form className='d-flex p-5 justify-content-between' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="empId" className="form-label">Employee Name</label>
                    <select className="form-select" id="Emp-name" value={empId} onChange={handleEmp}>
                        <option value='all'>All Employees</option>
                        {empDetails.map(emp => (
                        <option key={emp._id} value={emp._id}>{emp.employeeName}, {`(${emp.department})`}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="Attendance-date" className="form-label">Date :</label>
                    <input type="date" className="form-control" id="date-attendance" value={doa} onChange={handleDate} />
                </div>
                <div className="mb-3">
                    <label htmlFor='attendance-status' className='form-label'>Select Attendance Status:</label>
                    <select
                        value={attendanceStatus}
                        className='form-select'
                        onChange={handleHoliday}>
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
            {responseMessage && (
                <div className="alert alert-info" role="alert">
                {responseMessage}
                </div>
            )}
        </div>
    </div>
  )
}

export default MarkAttendance