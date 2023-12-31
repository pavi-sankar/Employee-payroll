import React from 'react'
import './Profile.css'
import { Link, Outlet } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios'

function Profile() {

  const [accdetails, setAccDetails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/getprofile")
      .then(result => {setAccDetails(result.data)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='custom-profile-container p-0'>
      <div className='custom-profile-header d-flex justify-content-between p-2 px-3 mb-2'>
        <h4>Profile</h4>
        <Link to='/home/profile/profile-update' className='custom-profile-update-button shadow cur-po my-auto rounded-2 p-1 text-decoration-none'>
          Update
        </Link>
      </div>
      <div className="custom-profile-details p-3 pb-4">
        <h5>Account Details</h5>
        {accdetails.map((e) => ( 
        <div key={e._id} className="custom-profile-details-body d-flex mt-3">
          <div className='col abs-center'>
            <div>
              <div className='my-1'>Username : <span>{e.username}</span> </div><br />
              <div className='my-1'>First Name: <span>{e.fname}</span> </div>               
            </div>
          </div>
          <div className='col abs-center'>
            <div>
              <div className='my-1'>DOB : <span>{e.DOB}</span> </div><br />
              <div className='my-1'>Last Name : <span>{e.lname}</span> </div>
            </div>
          </div>
        </div>  ))}     
      </div>
      <div className='custom-update-profile'>
        <Outlet />
      </div>
    </div>
  )
}

export default Profile