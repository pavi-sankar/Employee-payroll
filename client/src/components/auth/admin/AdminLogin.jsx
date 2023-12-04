import "./AdminLogin.css"
import axios from 'axios'
import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom'


function AdminLogin(){
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [errorRes,setErrorRes] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(username=='' || password=='')
    {
      setErrorRes("empty input")
    }
    else{
    axios.post('http://localhost:3000/adminlogin', { username, password})
    .then(res => {
      if(res.data === "Success") {
        navigate("/home")
        setUsername('')
        setPassword('')
      }
        else{
          setErrorRes(res.data)
      } 
    })
    .catch(err =>{ console.log(err)
      setErrorRes('Error occurred')})
}}
const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleSubmit();
  }
}

  return (
    <div className="container-fluid custom-login-container">
    <div className="row justify-content-center align-items-center vh-100">
      <div className="col-md-3">
        <div className="card custom-login-card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input type="text" autoComplete='off' className="form-control custom-login-input" value={username} id="username" onChange={(e)=>setUsername(e.target.value)} onKeyDown={handleKeyPress} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control custom-login-input"
                  autoComplete='current-password'
                  id="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <button type="submit" className="btn w-75 custom-login-btn mt-5 mx-auto">
                Login
              </button>
            </form>
            <div>
                <h5 className="mt-3 text-center text-danger">
                    {errorRes}
                </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AdminLogin;
