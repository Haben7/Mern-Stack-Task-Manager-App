// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleClose = () => {
//     navigate('/signIn');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear previous errors

//     try {
//       const res = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       // Log the raw response for debugging
//       const textResponse = await res.text();
//       console.log('Response Text:', textResponse);

//       if (!res.ok) {
//         // If the response status is not OK, handle it as an error
//         throw new Error(textResponse);
//       }

//       const data = JSON.parse(textResponse); // Parse response as JSON
//       alert(data.message);
//       handleClose(); // Close the modal after submission
//     } catch (err) {
//       console.error('Error:', err.message);
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-button" onClick={handleClose}>
//           &times;
//         </button>
//         <h2 id="newTask">Forgot Password</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//             className="modal-input"
//           />
//           <button className="submit-button" type="submit">
//             Reset Password
//           </button>
//         </form>
//         {error && <p className="error-message">{error}</p>} {/* Display error message */}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: Code Verification
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
      const handleClose = () => {
     navigate('/signIn');
  };
  // Handle email submission for password reset
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error('Failed to send verification code');
      }

      alert('Verification code sent to your email.');
      setStep(2); // Move to the next step
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  // Handle verification code submission
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

      alert('Code verified. You are now logged in.');
      localStorage.setItem('token', data.token); // Save the token locally
      navigate('/'); // Redirect to the home page
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
    <div className="modal-content">
     <button className="close-button" onClick={handleClose}>
       &times;
     </button>
      {step === 1 ? (
        // Step 1: Email Input
        
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
      ) : (
        // Step 2: Code Verification
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
    </div>
    </div>
  );
};

export default ForgotPassword;
