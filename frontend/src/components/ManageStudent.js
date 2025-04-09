import React, { useState, useEffect } from 'react';

function ManageStudent() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Fetch all students
  useEffect(() => {
    fetch('/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  // Handle delete student
  const handleDelete = (id) => {
    fetch(`/api/students/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
        alert('Student deleted successfully!');
      })
      .catch((error) => console.error('Error deleting student:', error));
  };

  // Handle edit student
  const handleEdit = (student) => {
    setEditingStudent(student);
    setName(student.name);
    setEmail(student.email);
  };

  // Handle update student
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedStudent = { ...editingStudent, name, email };

    fetch(`/api/students/${editingStudent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(
          students.map((student) =>
            student.id === data.id ? data : student
          )
        );
        setEditingStudent(null);
        setName('');
        setEmail('');
        alert('Student updated successfully!');
      })
      .catch((error) => console.error('Error updating student:', error));
  };

  return (
    <div>
      <h2>Manage Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.email}
            <button onClick={() => handleEdit(student)}>Edit</button>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingStudent && (
        <div>
          <h3>Edit Student</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Update Student</button>
            <button onClick={() => setEditingStudent(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ManageStudent;
