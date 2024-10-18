import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: ''});
  const navigate = useNavigate();
  const {notifySuccess, notifyError} = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post('http://localhost:5000/api/auth/login', form)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        const token = response.data.token;
        const tokenParts = token.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        navigate('/add-muscle');
        notifySuccess('Login Successfully !!')
      })
      .catch((error) => {
        console.error('Login error', error);
        const errorMessage = error.response && error.response.data && error.response.data.message 
          ? error.response.data.message 
          : 'An error occurred. Please try again.';
        notifyError(errorMessage);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="username"
          type="email"
          value={form.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
