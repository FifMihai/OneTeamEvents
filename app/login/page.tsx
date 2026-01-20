"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '', // Am schimbat în 'email' simplu ca să fie clar
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Date de logare incorecte.");
        return;
      }

      // AM SCOS linia cu document.cookie = ... 
      // Serverul a pus deja cookie-ul corect.
      
      console.log("Login reușit");
      router.push('/dashboard'); 
      router.refresh(); // Un refresh scurt ca să vadă middleware-ul noul cookie

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
            <label htmlFor="email">Email or Username</label>
            <input 
              type="text" 
              id="email" 
              placeholder="Enter your email or username "
              required 
              // Actualizăm state-ul corect
              onChange={(e) => setFormData({...formData, email: e.target.value})}
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