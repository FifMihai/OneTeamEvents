"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import pentru redirectare lina
import './register.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // State pentru mesaje de eroare
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    username: '', // Acesta va fi salvat ca "name" in baza de date
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Resetam erorile la fiecare apasare

    try {
      // Trimitem datele catre API-ul creat anterior
      const res = await fetch("/api/events/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Mapam 'username' din formularul tau la 'name' pentru baza de date
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password, 
          name: formData.username 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Daca serverul zice ca e o problema (ex: email existent)
        setError(data.error || "Înregistrare eșuată.");
        return;
      }

      // Daca totul e ok
      alert("Cont creat cu succes!");
      router.push('/login'); 
      
    } catch (err) {
      setError("Eroare de conexiune. Încearcă din nou.");
    }
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

          {/* Afisam eroarea aici, pastrand designul */}
          {error && (
            <div style={{ color: "#ef4444", marginBottom: "15px", fontSize: "0.9rem", textAlign: "center" }}>
              {error}
            </div>
          )}

          <button type="submit" className="register-button-main">Register</button>
          
          <button 
            type="button" 
            className="back-button" 
            onClick={() => router.push('/login')}
          >
            Back to Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;