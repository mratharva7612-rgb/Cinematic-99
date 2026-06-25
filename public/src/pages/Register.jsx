import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser, language }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
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
      setError(language === 'en' ? 'Registration failed' : 'नोंदणी अयोग्य');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>{language === 'en' ? 'Register' : 'नोंदणी'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder={language === 'en' ? 'Full Name' : 'पूर्ण नाव'} value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder={language === 'en' ? 'Email' : 'ईमेल'} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder={language === 'en' ? 'Password' : 'पासवर्ड'} value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="tel" placeholder={language === 'en' ? 'Phone' : 'फोन'} value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button type="submit">{language === 'en' ? 'Register' : 'नोंदणी'}</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Register;