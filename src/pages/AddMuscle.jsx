import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AddMuscle = () => {
  // const user_id = useAuth();
  const [muscleName, setMuscleName] = useState("");
  const {userId,token} = useAuth();
  console.log(token);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`API_BASE_URL/muscles`, { name: muscleName, user_id : userId, token : "token"})
      .then((response) => {
        setMuscleName("");
        
      })
      .catch((error) => {
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
    </Container>
  );
};

export default AddMuscle;
