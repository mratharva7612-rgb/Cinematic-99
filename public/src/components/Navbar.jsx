import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, setUser, language, setLanguage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">🎬 Cinematic 99</Link>
      </div>
      <div className="nav-center">
        <Link to="/">{language === 'en' ? 'Home' : 'होम'}</Link>
        <Link to="/courses">{language === 'en' ? 'Courses' : 'अभ्यासक्रम'}</Link>
      </div>
      <div className="nav-right">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="lang-select">
          <option value="en">English</option>
          <option value="mr">मराठी</option>
        </select>
        {user ? (
          <>
            <Link to="/dashboard" className="nav-btn">{user.name}</Link>
            <button onClick={handleLogout} className="nav-btn logout">{language === 'en' ? 'Logout' : 'लॉगआउट'}</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">{language === 'en' ? 'Login' : 'लॉगिन'}</Link>
            <Link to="/register" className="nav-btn register">{language === 'en' ? 'Register' : 'नोंदणी'}</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;