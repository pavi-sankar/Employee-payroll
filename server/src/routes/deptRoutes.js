const express = require('express');
const deptModel = require('../models/Department');

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
    const deletedDept = await deptModel.findByIdAndDelete({ _id: id });

    if (!deletedDept) {
      return res.status(404).json({ error: 'dept not found' });
    }

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
  try {
      const updateDept = await deptModel.findByIdAndUpdate(id ,{
          depName: req.body.depName,
          depDes: req.body.depDes,
          designation: req.body.designation
      }, { new: true });

      res.json(updateDept);
  } catch (err) {
      res.json({ error: err.message });
  }
}); 

module.exports = router;
