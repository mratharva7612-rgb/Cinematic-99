import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import Courses from './pages/Courses';

function App() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      setUser(userData);
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} language={language} setLanguage={setLanguage} />
      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/login" element={<Login setUser={setUser} language={language} />} />
        <Route path="/register" element={<Register setUser={setUser} language={language} />} />
        <Route path="/dashboard" element={<Dashboard user={user} language={language} />} />
        <Route path="/courses" element={<Courses language={language} />} />
        <Route path="/admin" element={<AdminPanel language={language} />} />
        <Route path="/admin-login" element={<AdminLogin language={language} />} />
      </Routes>
    </Router>
  );
}

export default App;