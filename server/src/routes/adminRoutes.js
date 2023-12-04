const express = require('express');
const employeesModel = require('../models/employees');

const router = express.Router();

router.post('/adminlogin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await employeesModel.findOne({ username });

    if (user) {
      if (user.password === password) {
        res.json('Success');
      } else {
        res.json('The password is incorrect');
      }
    } else {
      res.json('No record');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
