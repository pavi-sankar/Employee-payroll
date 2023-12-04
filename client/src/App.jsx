import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import LandingPage from './screens/landingpage/LandingPage';
import Home from './screens/home/Home';
import Employee from './components/Dashboard/employee/Employee';
import Department from './components/Dashboard/department/Department';
import Dashboard from './components/Dashboard/Dashboard';
import Attendance from './components/Dashboard/attendance/Attendance';
import Payroll from './components/Dashboard/payroll/Payroll';
import Profile from './components/Dashboard/profile/Profile';
import ProfileUpdate from './components/Dashboard/profile/profile-update/ProfileUpdate';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} >
            <Route path="" element={<Dashboard />} />
            <Route path='/home/employee' element={<Employee />} />
            <Route path='/home/department' element={<Department />} />
            <Route path='/home/attendance' element={<Attendance />} />
            <Route path='/home/payroll' element={<Payroll />} />
            <Route path='/home/profile' element={<Profile />} >
              <Route path='/home/profile/profile-update' element={<ProfileUpdate />} />
            </Route>
          </Route>  
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
