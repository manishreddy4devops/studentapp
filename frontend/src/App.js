import React, { useState, useEffect } from "react";

function App() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch("/api/students")
            .then((response) => response.json())
            .then((data) => setStudents(data));
    }, []);

    return (
        <div>
            <h1>Student List</h1>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>{student.name} - {student.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
