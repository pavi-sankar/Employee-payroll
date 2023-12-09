const express = require('express');
const deptModel = require('../models/Department');
const EmpModel= require('../models/Emp');
const Attendance= require('../models/Attendance');
const PayrollModel = require('../models/Payroll');

const router = express.Router();

// to add department
router.post('/add-dept', async (req, res) => {
  try {
    const newDepartment = await deptModel.create(req.body);
    res.status(201).json(newDepartment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//to get all dept details
router.get('/getDepDetails',async(req,res)=>{
  await deptModel.find(req.body)
  .then(result =>res.json(result))
  .catch(err =>res.json(err))
});

//to delete dept
router.delete('/deleteDept/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deleteDep = await deptModel.findById({_id: id });
    const deletedepName = deleteDep.depName;

    const deletedDept = await deptModel.findByIdAndDelete({ _id: id });

    if (!deletedDept) {
      return res.status(404).json({ error: 'dept not found' });
    }
    
    //delete coresponding employee
    await EmpModel.deleteMany({ department: deletedepName })

    //delete coresponding attendance log
    await Attendance.deleteMany({ department: deletedepName })

    res.json({ message: 'Dept deleted successfully', deletedDept });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//to get selected dept
router.get('/getEditDept/:id',(req,res)=>{
  const id = req.params.id;
  deptModel.findById({_id:id})
  .then(users=>res.json(users))
  .catch(err => res.json(err))
})

//to update
router.put('/edit-dept/:id', async (req, res) => {
  const id = req.params.id;
  const { depName: newDepName, depDes: newDepDes } = req.body;

  try {
    // Find and update the department
    const oldDepartment = await deptModel.findById(id);
    const oldDepName = oldDepartment.depName;

    const updatedDept = await deptModel.findByIdAndUpdate(id, {
      depName: newDepName,
      depDes: newDepDes,
    }, { new: true });

    // Update the corresponding employees
    await EmpModel.updateMany({ department: oldDepName }, {
      $set: { department: newDepName },
    });

    // Update corresponding Attendance
    await Attendance.updateMany({ department: oldDepName }, {
      $set: { department: newDepName },
    });

    //update corresponding payroll
    await PayrollModel.updateMany({ department: oldDepName }, {
      $set: { department: newDepName },
    });

    res.json(updatedDept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//to get no dept documents
router.get('/deptCount', async (req, res) => {
  try {
    const deptCount = await deptModel.countDocuments();
    res.json({ count: deptCount });
  } catch (error) {
    console.error('Error getting department count', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
