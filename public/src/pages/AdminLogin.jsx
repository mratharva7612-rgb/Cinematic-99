import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ language }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(language === 'en' ? 'Invalid password' : 'चुकीचा पासवर्ड');
      }
    } catch (err) {
      setError('Error logging in');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-box">
        <h2>🔐 {language === 'en' ? 'Admin Portal' : 'प्रशासक पोर्टल'}</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder={language === 'en' ? 'Enter admin password' : 'प्रशासक पासवर्ड प्रविष्ट करा'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{language === 'en' ? 'Login' : 'लॉगिन'}</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;