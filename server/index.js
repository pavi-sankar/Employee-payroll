const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./src/routes/adminRoutes');
const port = 3000;

const employeesModel = require('./src/models/employees');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/employees');

app.use('/', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


