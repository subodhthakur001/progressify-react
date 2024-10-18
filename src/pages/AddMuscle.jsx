import React, { useEffect, useState } from "react";
import { Container, Typography, Button, TextField } from "@mui/material"; // Ensure TextField is imported
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useToast from '../hooks/useToast'; 
import { CompressOutlined } from "@mui/icons-material";

const AddMuscle = () => {
  const [muscleName, setMuscleName] = useState("");
  const [muscles, setMuscles] = useState([]); // Initialize as an empty array
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { userId, token } = useAuth();
  console.log("token is",token);  
  console.log("user id is",userId);  
  const { notifySuccess, notifyError } = useToast(); 

  useEffect(() => {
    const fetchMuscles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/muscle`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response is",response);
        setMuscles(response.data.muscle_list); // Adjust based on actual response structure
      } catch (error) {
        console.error("Error fetching muscles", error);
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
        setMuscles((prevMuscles) => [...prevMuscles, response.data]); // Assuming response.data is the new muscle
        notifySuccess('Muscle added successfully!');
      })
      .catch((error) => {
        notifyError('Something went wrong!');
        console.error("Error adding muscle", error);
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

      <Typography variant="h5" gutterBottom>
        Added Muscles
      </Typography>
      {Array.isArray(muscles) && muscles.map((muscle) => (
        <div key={muscle.id}>
          <span>{muscle.name}</span>
          {/* Add Edit and Delete buttons here */}
        </div>
      ))}
    </Container>
  );
};

export default AddMuscle;
