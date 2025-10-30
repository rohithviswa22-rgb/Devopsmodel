const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// 🧠 Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Student API is running 🚀' });
});

// ➕ Add Student
router.post('/', async (req, res) => {
  try {
    console.log('📩 Incoming request body:', req.body);

    const { rollNumber, name, marks } = req.body;

    // Basic validation
    if (!rollNumber || !name || marks === undefined) {
      return res.status(400).json({ error: 'All fields (rollNumber, name, marks) are required' });
    }

    // Check if roll number already exists
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ error: 'Roll number already exists' });
    }

    const newStudent = new Student({ rollNumber, name, marks });
    await newStudent.save();

    console.log('✅ Student added successfully:', newStudent);
    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (err) {
    console.error('❌ Error while adding student:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// ✏️ Edit Student
router.put('/:id', async (req, res) => {
  try {
    console.log('✏️ Editing student:', req.params.id, req.body);

    const { rollNumber, name, marks } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { rollNumber, name, marks },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (err) {
    console.error('❌ Error while editing student:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// ❌ Delete Student
router.delete('/:id', async (req, res) => {
  try {
    console.log('🗑️ Deleting student:', req.params.id);

    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('❌ Error while deleting student:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// 📋 Get All Students
router.get('/', async (req, res) => {
  try {
    console.log('📋 Fetching all students...');
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error('❌ Error fetching students:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// 🔍 Get by Roll Number
router.get('/search/:rollNumber', async (req, res) => {
  try {
    console.log('🔍 Searching for:', req.params.rollNumber);
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    console.error('❌ Error searching student:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

module.exports = router;
