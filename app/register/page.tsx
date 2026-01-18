"use client";

import React, { useState } from 'react';
import './register.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Date înregistrare:", formData);
    // După înregistrare, îl putem trimite la login
    window.location.href = '/login'; 
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Create New Account</h2>
        <form onSubmit={handleRegister}>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email address" 
              required 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Choose a username" 
              required 
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-field-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="Enter your password" 
                required 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button" 
                id="togglePassword" 
                onClick={togglePasswordVisibility}
              >
                <img 
                  src={showPassword ? "/media/hidden.png" : "/media/eye.png"} 
                  alt="Toggle password" 
                />
              </button>
            </div>
          </div>

          <button type="submit" className="register-button-main">Register</button>
          
          <button 
            type="button" 
            className="back-button" 
            onClick={() => window.location.href = '/login'}
          >
            Back to Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;