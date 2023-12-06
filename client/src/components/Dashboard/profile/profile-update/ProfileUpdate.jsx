import React from 'react'
import './ProfileUpdate.css'
import { useState,useEffect } from 'react'
import { useNavigate, } from 'react-router-dom'
import axios from 'axios'

function ProfileUpdate() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const [id,setId] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
      axios.get(`http://localhost:3000/getprofile/`)
        .then(response => {
          setId(response.data[0]._id)
        })
        .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!username || !password || !firstName || !lastName || !dob) {
            alert('Please fill in all fields');
          }
        else{
            setUsername('')
            setPassword('')
            setFirstName('');
            setLastName('');
            setDOB('');
            axios.put(`http://localhost:3000/updateprofile/${id}`, { username, password, firstName, lastName, dob})
            .then(result => {
              console.log(result.data);
              navigate("/home/profile");
              window.location.reload();
              // Provide feedback to the user upon success
            })
            .catch(err => {
              console.error(err);
              // Provide error handling and feedback to the user
            });
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