import React, { useState } from "react";

const StudentForm = ({ onAdd }) => {
  const [student, setStudent] = useState({ rollNo: "", name: "", marks: "" });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.rollNo || !student.name || !student.marks) return alert("All fields required!");
    onAdd(student);
    setStudent({ rollNo: "", name: "", marks: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="rollNo" placeholder="Roll No" value={student.rollNo} onChange={handleChange} />
      <input name="name" placeholder="Name" value={student.name} onChange={handleChange} />
      <input name="marks" placeholder="Marks" value={student.marks} onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
};

export default StudentForm;
