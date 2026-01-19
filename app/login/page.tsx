"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // State pentru erori
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email_username: '',
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Verificam credentialele in Baza de Date
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email_username, // API-ul asteapta email
          password: formData.password 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Aici prindem eroarea daca parola e gresita sau userul nu exista
        setError(data.error || "Date de logare incorecte.");
        return;
      }

      // 2. DACA parola e corecta, setam cookie-ul si intram
      // Acum cookie-ul e setat DOAR daca ai cont valid
      document.cookie = "auth_token=true; path=/; max-age=86400"; 
      
      console.log("Login reusit:", data);
      router.push('/dashboard'); 

    } catch (err) {
      setError("Eroare server. Verifică conexiunea.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label htmlFor="email_username">Email</label>
            <input 
              type="text" 
              id="email_username" 
              placeholder="Enter your email"
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

          {/* Mesaj de eroare cu rosu integrat in design */}
          {error && (
            <div style={{ color: "#ef4444", marginBottom: "15px", fontSize: "0.9rem", textAlign: "center" }}>
              {error}
            </div>
          )}

          <button type="submit" className="login-button-main">Log In</button>

          <button 
            type="button" 
            className="register-button" 
            onClick={() => router.push('/register')}
          >
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;