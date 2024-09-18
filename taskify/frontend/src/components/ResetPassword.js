// // ResetPassword.js
// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const { token } = useParams();  // Get token from URL
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Send new password and token to backend
//     fetch(`/api/auth/reset-password/${token}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ password: newPassword }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           alert('Password reset successfully');
//           navigate('/login');
//         } else {
//           alert(data.message);
//         }
//       });
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           placeholder="Enter new password"
//           required
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
