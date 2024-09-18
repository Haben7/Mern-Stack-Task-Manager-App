// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [code, setCode] = useState('');
//   const [password, setPassword] = useState('');
//   const [step, setStep] = useState(1); 
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleClose = () => {
//     navigate('/signIn');
//   };

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await fetch('https://mern-stack-task-manager-app-1.onrender.com/api/auth/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.message);
//       }

//       alert('Verification code sent to your email.');
//       setStep(2); // Proceed to step 2 (verification code entry)
//     } catch (err) {
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   const handleCodeSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await fetch('https://mern-stack-task-manager-app-1.onrender.com/api/auth/verify-code', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, code }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.message);
//       }

//       // Store token for password reset
//       localStorage.setItem('resetToken', data.token);
//       alert('Code verified. Please enter your new password.');
//       setStep(3); // Proceed to step 3 (password reset)
//     } catch (err) {
//       setError('Invalid verification code. Please try again.');
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const token = localStorage.getItem('resetToken');
//       const res = await fetch('https://mern-stack-task-manager-app-1.onrender.com/api/auth/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, // Pass the token
//         },
//         body: JSON.stringify({ password }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.message);
//       }

//       alert('Password updated successfully.');
//       navigate('/signIn'); // Redirect to sign-in page after success
//     } catch (err) {
//       setError('Unable to reset password. Please try again.');
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-button" onClick={handleClose}>
//           &times;
//         </button>
//         {step === 1 && (
//           <form onSubmit={handleEmailSubmit}>
//             <h2>Forgot Password</h2>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//               className="modal-input"
//             />
//             <button type="submit" className="submit-button">Send Verification Code</button>
//             {error && <p className="error-message">{error}</p>}
//           </form>
//         )}
//         {step === 2 && (
//           <form onSubmit={handleCodeSubmit}>
//             <h2>Enter Verification Code</h2>
//             <input
//               type="text"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               placeholder="Enter the code"
//               required
//             />
//             <button type="submit">Verify Code</button>
//             {error && <p className="error-message">{error}</p>}
//           </form>
//         )}
//         {step === 3 && (
//           <form onSubmit={handlePasswordSubmit}>
//             <h2>Reset Password</h2>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter new password"
//               required
//             />
//             <button type="submit">Update Password</button>
//             {error && <p className="error-message">{error}</p>}
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
