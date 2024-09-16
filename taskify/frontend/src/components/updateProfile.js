import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './styles/updateProfile.css'; 

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        setError('User is not authenticated.');
        return;
      }

      const response = await axios.put('http://localhost:4000/api/v1/update-password', {
        username,
        email,
        oldPassword,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Token sent for authentication
        },
      });

      if (response.status === 200) {
        setSuccess('Password updated successfully');
        setError('');
        navigate('/home');
      }
    } catch (error) {
      setError('Failed to update password. Please try again.');
      setSuccess('');
    }
  };

  const handleClose = () => {
    navigate('/home'); 
  };

  return (
    <>
      <form onSubmit={handleUpdatePassword}>
        <div className="modal-overlayy">
          <div className="modal-content">
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>
            <h2 id='newTask'>Update Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <label>Username:</label>
            <input
              type="text"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="modal-input"
            />
            <label>Email address:</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="modal-input"
            />
            <label>Old password:</label>
            <input
              type="password"
              placeholder="Old password..."
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="modal-input"
            />
            <label>New Password:</label>
            <input
              type="password"
              placeholder="New password..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="modal-input"
            />
            <button type='submit' className="submit-button">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateProfile;




































// import React, { useState } from 'react';
// import axios from 'axios'; 
// import { useNavigate } from 'react-router-dom'; 
//  import './updateProfile.css'; // Ensure the path is correct

// const UpdatePassword = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleUpdatePassword = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token'); 
//       const response = await axios.put('http://localhost:4000/api/v1/update-password', { 
//         username,
//         email,
//         oldPassword,
//         newPassword,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (response.status === 200) {
//         setSuccess('Password updated successfully');
//         setError('');
//         navigate('/home');
//       }
//     } catch (error) {
//       console.error('Error updating password:', error);
//       setError('Failed to update password. Please try again.');
//       setSuccess('');
//     }
//   };

//   const handleClose = () => {
//     navigate('/home'); 
//   };

//   return (
//     <div className="update-password-container">
//       <form onSubmit={handleUpdatePassword}>
//         <h2>Update Password</h2>
//         {error && <p className="error-message">{error}</p>}
//         {success && <p className="success-message">{success}</p>}
//         <label>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//         />
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <label>Old Password:</label>
//         <input
//           type="password"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//           placeholder="Old Password"
//         />
//         <label>New Password:</label>
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           placeholder="New Password"
//         />
//         <button type="submit">Update Password</button>
//       </form>
//     </div>
//   );
// };

// export default UpdatePassword;
