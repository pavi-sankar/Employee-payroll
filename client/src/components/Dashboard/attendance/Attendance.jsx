import React from 'react'
import { Link } from 'react-router-dom';

function Attendance() {
  return (
    <div className='p-0'>
      <div className='bg-primary d-flex'><h3 className='mx-auto pt-2 text-white'>Title</h3> <Link to='/home/mark-attendance' className='my-auto p-2'><button className='btn btn-success'>Add btn</button></Link></div>
      <div className='mt-3'>
        <table className='w-100 table-bordered text-center'>
          <thead style={{height: '50px'}}>
            <tr>
              <th>title1</th>
              <th>title2</th>
              <th>title3</th>
              <th>title4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>data1</td>
              <td>data2</td>
              <td>data3</td>
              <td>data4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance