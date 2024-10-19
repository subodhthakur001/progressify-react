import React, { useEffect, useState } from "react";
import { Container, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"; // Import necessary components
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useToast from '../hooks/useToast';
import { getToken } from "../common_utils/auth/getToken";
import { getUserId } from "../common_utils/auth/getUserId";
import { useNavigate } from "react-router-dom";

const AddMuscle = () => {
  const [muscleName, setMuscleName] = useState("");
  const navigate = useNavigate();
  const [muscles, setMuscles] = useState([]);
  const [editMuscle, setEditMuscle] = useState(null); // For editing a muscle
  const [updatedMuscleName, setUpdatedMuscleName] = useState(""); // For handling the updated name
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Delete confirmation dialog
  const [muscleToDelete, setMuscleToDelete] = useState(null); // Muscle to delete
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = getToken();
  const userId = getUserId();
  const { notifySuccess, notifyError } = useToast();

  useEffect(() => {
    const fetchMuscles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/muscle`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMuscles(response.data.muscle_list);
      } catch (error) {
        notifyError('Error fetching muscles');
      }
    };

    fetchMuscles();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_BASE_URL}/muscle`,
        { name: muscleName, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      .then((response) => {
        setMuscleName("");
        setMuscles((prevMuscles) => [...prevMuscles, response.data]); 
        notifySuccess('Muscle added successfully!');
      })
      .catch(() => {
        notifyError('Something went wrong!');
      });
  };

  const handleEditMuscle = (muscle) => {
    setEditMuscle(muscle);
    setUpdatedMuscleName(muscle.name);
  };

  const handleUpdateMuscle = () => {
    axios
      .put(`${API_BASE_URL}/muscle`, 
        { name: updatedMuscleName, user_id: userId, muscle_id : editMuscle.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      .then(() => {
        setMuscles((prevMuscles) =>
          prevMuscles.map((muscle) =>
            muscle.id === editMuscle.id ? { ...muscle, name: updatedMuscleName } : muscle
          )
        );
        setEditMuscle(null); 
        notifySuccess('Muscle updated successfully!');
      })
      .catch(() => {
        notifyError('Error updating muscle');
      });
  };

  const handleDeleteMuscle = (muscle) => {
    setIsDeleteDialogOpen(true);
    setMuscleToDelete(muscle); 
  };

  const confirmDeleteMuscle = () => {
    axios
      .delete(`${API_BASE_URL}/muscle/${muscleToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(() => {
        setMuscles((prevMuscles) => prevMuscles.filter(muscle => muscle.id !== muscleToDelete.id));
        setIsDeleteDialogOpen(false);
        setMuscleToDelete(null);
        notifySuccess('Muscle deleted successfully!');
      })
      .catch(() => {
        notifyError('Error deleting muscle');
      });
  };

  const handleNavigateToExercise = (muscleId,muscleName) => {
    navigate(`/add-exercise/${muscleName}`)
  }

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

      <Typography variant="h5" gutterBottom>
        Added Muscles
      </Typography>
      {muscles.map((muscle) => (
        <div key={muscle.id} onClick={() => handleNavigateToExercise(muscle.id,muscle.name)} style={{ cursor: "pointer", display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span>{muscle.name}</span>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEditMuscle(muscle)}
              style={{ marginRight: '10px' }}
            >
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={() => handleDeleteMuscle(muscle)}>
              Delete
            </Button>
          </div>
        </div>
      ))}

      {editMuscle && (
        <Dialog open={true} onClose={() => setEditMuscle(null)}>
          <DialogTitle>Edit Muscle</DialogTitle>
          <DialogContent>
            <TextField
              label="Muscle Name"
              value={updatedMuscleName}
              onChange={(e) => setUpdatedMuscleName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditMuscle(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateMuscle} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this muscle?</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteMuscle} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddMuscle;
