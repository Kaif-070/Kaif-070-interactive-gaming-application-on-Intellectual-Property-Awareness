import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; 

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="ip-signup-container">
      <h2 className="ip-signup-title">Sign Up</h2>
      <form className="ip-signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          required
          className="ip-signup-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="ip-signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="ip-signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="ip-signup-button">Sign Up</button>
        <p className="ip-signup-footer">
          Already have an account? <a href="/login" className="ip-signup-link">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
