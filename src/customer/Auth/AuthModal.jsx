import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Box, Typography, Button, Alert } from '@mui/material';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { login, register } from '../../State/Auth/Action';

const AuthModal = ({ open, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Tracks which form to display
  const [successMessage, setSuccessMessage] = useState(''); // Tracks success message
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { error } = authState; // Extract error message from Redux state

  const handleRegister = async (formData) => {
    const success = await dispatch(register(formData));
    if (success) {
      setSuccessMessage('Registration successful! Please log in.');
      setIsLogin(true); // Switch to login form on successful registration
    } else {
      alert(error || "Registration failed. Please try again."); // Display error message
    }
  };

  const handleLogin = async (formData) => {
    const success = await dispatch(login(formData));
    if (success) {
      handleClose(); // Close modal on successful login
    } else {
      alert(error || "Login failed. Please try again."); // Display error message
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', mx: 'auto', my: '20vh', width: 500, borderRadius: 2 }}>
        <Typography variant="h6" align="center" gutterBottom>
          {isLogin ? 'Sign In' : 'Register'}
        </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {isLogin ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegisterForm onSubmit={handleRegister} />
        )}
        <Button
          variant="text"
          onClick={() => setIsLogin(!isLogin)}
          sx={{ mt: 2, display: 'block', mx: 'auto' }}
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign In'}
        </Button>
      </Box>
    </Modal>
  );
};

export default AuthModal;