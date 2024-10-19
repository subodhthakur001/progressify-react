import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useParams } from "react-router-dom";
import useToast from '../hooks/useToast';
import { getToken } from "../common_utils/auth/getToken";
import axios from "axios";

const AddExercise = () => {
  const { muscleName } = useParams(); 
  const { muscleId } = useParams();
  const token = getToken();
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState(""); 
  const [editExerciseId, setEditExerciseId] = useState(null);
  const [editExerciseName, setEditExerciseName] = useState(""); 
  const [deleteExerciseId, setDeleteExerciseId] = useState(null);

  const { notifySuccess, notifyError } = useToast();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/exercise/muscle/${muscleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response : ",response.data.data);
        setExercises(response.data.data); 
      } catch (error) {
        console.log("Error fetching exercises:", error);
        notifyError("Error fetching exercises");
      }
    };
    fetchExercises();
  }, []);

  const handleAddExercise = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/exercise`, {
        name: exerciseName,
        muscle_id: muscleId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExercises([...exercises, response.data.data]); 
      setExerciseName("");
      notifySuccess("Exercise added successfully");
    } catch (error) {
      console.log("Error adding exercise:", error);
      notifyError("Error adding exercise");
    }
  };

  const handleEditExercise = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/exercise/${editExerciseId}`, {
        name: editExerciseName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExercises(exercises.map(exercise => exercise.id === editExerciseId ? response.data.data : exercise));
      setEditExerciseId(null);
      setEditExerciseName("");
      notifySuccess("Exercise updated successfully");
    } catch (error) {
      console.log("Error editing exercise:", error);
      notifyError("Error editing exercise");
    }
  };

  // Handle delete button click
  const handleDeleteExercise = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/exercise/${deleteExerciseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExercises(exercises.filter(exercise => exercise.id !== deleteExerciseId));
      setDeleteExerciseId(null);
      notifySuccess("Exercise deleted successfully");
    } catch (error) {
      console.log("Error deleting exercise:", error);
      notifyError("Error deleting exercise");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Exercises for {muscleName}
      </Typography>
      {/* Add New Exercise */}
      <form onSubmit={handleAddExercise}>
        <TextField
          label="Exercise Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Exercise
        </Button>
      </form>

      {/* List of Exercises */}
      <Typography variant="h5" gutterBottom>
        Added Exercises
      </Typography>
      {exercises.map((exercise) => (
        <div key={exercise.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
          <span>{exercise.name}</span>
          <div>
            <Button
              onClick={() => { setEditExerciseId(exercise.id); setEditExerciseName(exercise.name); }}
              color="primary"
              variant="outlined"
            >
              Edit
            </Button>
            <Button
              onClick={() => setDeleteExerciseId(exercise.id)}
              color="secondary"
              variant="outlined"
              style={{ marginLeft: '10px' }}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      {/* Edit Exercise Dialog */}
      <Dialog open={!!editExerciseId} onClose={() => setEditExerciseId(null)}>
        <DialogTitle>Edit Exercise</DialogTitle>
        <DialogContent>
          <TextField
            label="Exercise Name"
            value={editExerciseName}
            onChange={(e) => setEditExerciseName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditExerciseId(null)} color="secondary">Cancel</Button>
          <Button onClick={handleEditExercise} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Exercise Confirmation */}
      <Dialog open={!!deleteExerciseId} onClose={() => setDeleteExerciseId(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this exercise?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteExerciseId(null)} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteExercise} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddExercise;
