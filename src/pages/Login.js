import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          {/* <img src="/logo192.png" alt="CRM Lite" className="login-logo" /> */}
          <h2 className="login-title">CRM Lite</h2>
          <p className="login-subtitle">Manage your contacts efficiently</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-2">
          <span>Don't have an account? <Link to="/register">Register</Link></span>
        </div>
      </div>
    </div>
  );
}

export default Login; 