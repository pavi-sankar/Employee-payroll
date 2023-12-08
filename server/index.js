const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./src/routes/adminRoutes');
const deptRoutes = require('./src/routes/deptRoutes');
const employeeRoutes =require('./src/routes/employeeRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');
const payrollRoutes = require('./src/routes/payrollRoutes');
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/employees');

app.use('/', adminRoutes);
app.use('/', deptRoutes);
app.use('/', employeeRoutes);
app.use('/', attendanceRoutes);
app.use('/', payrollRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


