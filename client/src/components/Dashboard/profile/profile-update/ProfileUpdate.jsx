import React from 'react'
import './ProfileUpdate.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileUpdate() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!username || !password || !firstName || !lastName || !dob) {
            alert('Please fill in all fields');
          }
        else{
            navigate("/home/profile")
            setUsername('')
            setPassword('')
            setFirstName('');
            setLastName('');
            setDOB('');
            console.log(username ,password ,firstName,lastName ,dob) 
        }
    }

    const handleClear = () => {
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setDOB('');
      };

    const handleCancel = () => {
        navigate("/home/profile")
    } 

  return (
    <div className='container-fluid'>
    <h4 className="text-center mt-4">profile update</h4>
      <div className="custom-profile-update-form p-5">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Username:</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" className="form-control" autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
            <label className="form-label">First Name:</label>
            <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="mb-3">
            <label className="form-label">Last Name:</label>
            <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="mb-3">
            <label className="form-label">DOB:</label>
            <input type="date" className="form-control" value={dob} onChange={(e) => setDOB(e.target.value)} />
            </div>
            <button type="submit" className="btn custom-profileupdate-submit-btn m-2">Submit</button>
            <button type="button" className="btn custom-profileupdate-clear-btn m-2" onClick={handleClear}>Clear</button>
            <button type="button" className="btn custom-profileupdate-Cancel-btn m-2" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default ProfileUpdate