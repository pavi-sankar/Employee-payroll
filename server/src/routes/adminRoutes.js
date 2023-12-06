const express = require('express');
const employeesModel = require('../models/employees');

const router = express.Router();

//check login
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

//get all data to profile
router.get('/getprofile',async(req,res)=>{
  await employeesModel.find(req.body)
  .then(users =>res.json(users))
  .catch(err =>res.json(err))
});

router.put('/updateprofile/:id', async (req, res) => {
  const _id = req.params.id;
  try {
      const updateUser = await employeesModel.findByIdAndUpdate(_id,{
          username: req.body.username,
          password: req.body.password,
          fname: req.body.firstName,
          lname: req.body.lastName,
          DOB: req.body.dob
      }, { new: true });

      res.json(updateUser);
  } catch (err) {
      res.json({ error: err.message });
  }
}); 

module.exports = router;
