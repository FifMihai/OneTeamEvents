"use client";

import React, { useState } from 'react';
import './reset.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cerere resetare trimisă pentru:", email);
    alert("Dacă adresa există, vei primi un link de resetare!");
    // Îl trimitem înapoi la login după trimitere
    window.location.href = '/login';
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleReset}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email address" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="reset-button-main">Send Reset Link</button>
          
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

export default ResetPassword;