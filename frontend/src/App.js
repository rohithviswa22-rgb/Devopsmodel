import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    marks: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.rollNumber || !formData.name || formData.marks === "") {
      alert("All fields are required!");
      return;
    }

    try {
      if (editingId) {
        // ✏️ Update existing student
        await axios.put(`http://localhost:5000/api/students/${editingId}`, formData);
        setEditingId(null);
      } else {
        // ➕ Add new student
        await axios.post("http://localhost:5000/api/students", formData);
      }

      setFormData({ rollNumber: "", name: "", marks: "" });
      fetchStudents();
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };

  // ✅ Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  // ✅ Edit student (populate form)
  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({
      rollNumber: student.rollNumber,
      name: student.name,
      marks: student.marks,
    });
  };

  return (
    <div className="app-container">
      <h1>🎓 Student Marks Management</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          name="rollNumber"
          placeholder="Enter Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="marks"
          placeholder="Enter Marks"
          value={formData.marks}
          onChange={handleChange}
          required
        />
        <button type="submit" className={editingId ? "update-btn" : "add-btn"}>
          {editingId ? "Update Student" : "Add Student"}
        </button>
        {editingId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setEditingId(null);
              setFormData({ rollNumber: "", name: "", marks: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Student List Section */}
      <div className="student-list">
        {students.length > 0 ? (
          students.map((student) => (
            <div key={student._id} className="student-card">
              <h3>{student.name}</h3>
              <p>Roll No: <strong>{student.rollNumber}</strong></p>
              <p>Marks: <strong>{student.marks}</strong></p>

              <div className="actions">
                <button
                  onClick={() => handleEdit(student)}
                  className="edit-btn"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="delete-btn"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No student records found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
