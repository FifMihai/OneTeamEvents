"use client";

import React, { useState } from 'react';
import './login.css';
const Login = () => {
  // State pentru vizibilitate parolă
  const [showPassword, setShowPassword] = useState(false);
  
  // State pentru datele din input-uri
  const [formData, setFormData] = useState({
    email_username: '',
    password: ''
  });

  // Funcția care se ocupă de butonul de "Ochi"
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Creează biletul de acces (Cookie-ul) pe care middleware-ul îl caută la linia 6
  document.cookie = "auth_token=true; path=/; max-age=86400"; 

  console.log("Date trimise:", formData);

  // 2. Te trimite la pagina ta principală (Home), nu pe un link extern
  window.location.href = '/dashboard'; 
};

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label htmlFor="email_username">Email or Username</label>
            <input 
              type="text" 
              id="email_username" 
              placeholder="Enter your email or username"
              required 
              onChange={(e) => setFormData({...formData, email_username: e.target.value})}
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

          <div className="reset">
            <a href="/reset">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button-main">Log In</button>

          <button 
            type="button" 
            className="register-button" 
            onClick={() => window.location.href = '/register'}
          >
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;