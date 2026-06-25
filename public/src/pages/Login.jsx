import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser, language }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(language === 'en' ? 'Login failed' : 'लॉगिन अयोग्य');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>{language === 'en' ? 'Login' : 'लॉगिन'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder={language === 'en' ? 'Email' : 'ईमेल'} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder={language === 'en' ? 'Password' : 'पासवर्ड'} value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">{language === 'en' ? 'Login' : 'लॉगिन'}</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;