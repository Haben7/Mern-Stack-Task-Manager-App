import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: Code Verification, 3: Reset Password
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/signIn');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://mern-stack-task-manager-app-1.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      alert(data.message);
      setStep(2);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      alert('Code verified. Please enter your new password.');
      setStep(3);
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, token: localStorage.getItem('resetToken') }), // Store token from backend
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      alert('Password updated successfully.');
      navigate('/signIn');
    } catch (err) {
      setError('Error updating password. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <h2>Forgot Password</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="modal-input"
            />
            <button type="submit" className="submit-button">Send Verification Code</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleCodeSubmit}>
            <h2>Enter Verification Code</h2>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the code"
              required
            />
            <button type="submit">Verify Code</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handlePasswordSubmit}>
            <h2>Reset Password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
            <button type="submit">Update Password</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
