import React, { useState } from "react";

const StudentList = ({ students, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (student) => {
    setEditId(student._id);
    setEditData(student);
  };

  const handleSave = () => {
    onUpdate(editId, editData);
    setEditId(null);
  };

  return (
    <div>
      <h3>Student List</h3>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>
                  {editId === s._id ? (
                    <input
                      value={editData.rollNo}
                      onChange={(e) => setEditData({ ...editData, rollNo: e.target.value })}
                    />
                  ) : (
                    s.rollNo
                  )}
                </td>
                <td>
                  {editId === s._id ? (
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    s.name
                  )}
                </td>
                <td>
                  {editId === s._id ? (
                    <input
                      value={editData.marks}
                      onChange={(e) => setEditData({ ...editData, marks: e.target.value })}
                    />
                  ) : (
                    s.marks
                  )}
                </td>
                <td>
                  {editId === s._id ? (
                    <button onClick={handleSave}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(s)}>Edit</button>
                  )}
                  <button onClick={() => onDelete(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
