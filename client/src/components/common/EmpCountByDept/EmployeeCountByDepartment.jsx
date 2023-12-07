import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeCountByDepartment = ({ departmentName }) => {
  const [employeeCount, setEmployeeCount] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/employeeCount/${departmentName}`)
      .then(response => {
        const count = response.data.count;
        setEmployeeCount(count);
      })
      .catch(error => console.error('Error fetching employee count', error));
  }, [departmentName]);

  return (
    <div>
      {employeeCount !== null ? (
        <h5>{employeeCount}</h5>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EmployeeCountByDepartment;
