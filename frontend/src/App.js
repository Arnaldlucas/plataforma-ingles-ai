// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import Login from './pages/Login';

function App() {
  const [students, setStudents] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('access_token') || '');

  useEffect(() => {
    if (token) {
      fetch('http://127.0.0.1:8000/api/students/', {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          setStudents([]);
        }
      })
      .catch(err => console.error('Erro ao buscar alunos', err));
    }
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Lista de Alunos</h1>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} ({student.email}) - {student.xp} XP
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
