import React from 'react';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import ManageStudent from './components/ManageStudent';

function App() {
  return (
    <div className="App">
      <h1>Student Management</h1>
      <AddStudent />
      <StudentList />
      <ManageStudent />	  
    </div>
  );
}

export default App;
