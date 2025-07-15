import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await register(username, password);
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Registration failed');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">CRM Lite</h2>
          <p className="register-subtitle">Create your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label className="register-label">Username</label>
            <input type="text" className="register-input" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="register-form-group">
            <label className="register-label">Password</label>
            <input type="password" className="register-input" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="register-alert register-alert-danger">{error}</div>}
          {success && <div className="register-alert register-alert-success">{success}</div>}
          <button type="submit" className="register-btn">Register</button>
        </form>
        <div className="register-footer">
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </div>
      </div>
    </div>
  );
}

export default Register; 