import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'USER' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(API_BASE_URL);
    axios
      .post(`${API_BASE_URL}/auth/signup`, form)
      .then((response) => {
        console.log(response.data);
        toast.success('Signup successful!', { position: toast.POSITION.TOP_RIGHT });
        navigate('/login');
      })
      .catch((error) => {
        console.error('Signup error', error);
        toast.error('Signup failed! Please try again.', { position: toast.POSITION.TOP_RIGHT });
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
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
          Signup
        </Button>
      </form>

      {/* ToastContainer must be included to display toasts */}
      <ToastContainer />
    </Container>
  );
};

export default Signup;
