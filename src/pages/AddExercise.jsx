import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios'

const AddExercise = () => {
  const [muscles, setMuscles] = useState([]);
  const [exercise, setExercise] = useState({
    name: '',
    muscleId: '',
  });

  useEffect(() => {
    // Fetch muscles from API
    axios
      .get('/api/muscles')
      .then((response) => {
        setMuscles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching muscles', error);
      });
  }, []);

  const handleChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/exercises', exercise)
      .then((response) => {
        // Handle success
        alert('Exercise added successfully!');
        setExercise({ name: '', muscleId: '' });
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding exercise', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Exercise
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Exercise Name"
          name="name"
          value={exercise.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="muscle-select-label">Muscle Group</InputLabel>
          <Select
            labelId="muscle-select-label"
            name="muscleId"
            value={exercise.muscleId}
            onChange={handleChange}
            label="Muscle Group"
          >
            {muscles.map((muscle) => (
              <MenuItem key={muscle.id} value={muscle.id}>
                {muscle.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Exercise
        </Button>
      </form>
    </Container>
  );
};

export default AddExercise;
