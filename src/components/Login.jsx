import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="ip-login-container">
      <h2 className="ip-login-title">Login</h2>
      <form className="ip-login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          className="ip-login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="ip-login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="ip-login-button">Login</button>
        <p className="ip-login-footer">
          Don't have an account? <a href="/signup" className="ip-login-link">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
