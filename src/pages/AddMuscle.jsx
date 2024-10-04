import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const AddMuscle = () => {
  const [muscleName, setMuscleName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/muscles', { name: muscleName })
      .then((response) => {
        // Handle success (e.g., notify user)
        alert('Muscle added successfully!');
        setMuscleName('');
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding muscle', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Muscle Group
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Muscle Name"
          value={muscleName}
          onChange={(e) => setMuscleName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Muscle
        </Button>
      </form>
    </Container>
  );
};

export default AddMuscle;
