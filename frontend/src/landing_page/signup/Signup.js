import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Page refresh hone se rokega

    try {
      // Backend ko signup request bhej raha hai
      await API.post('/signup', {
        username,
        email,
        password,
      });

      // Account create hone ke baad Login page par redirect
      window.location.href = '/login';
    } catch (error) {
      console.error('Signup Error:', error);
      alert('Signup failed! Check console.');
    }
  };

  return (
    <div className="container text-center my-5">
      <h2>Signup for Zerodha</h2>
      <form className="w-50 mx-auto mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;