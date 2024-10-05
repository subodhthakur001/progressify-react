import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddMuscle from './pages/AddMuscle';
import AddExercise from './pages/AddExercise';
import ProtectedRoute from './components/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/add-muscle"
        element={
          <ProtectedRoute>
            <AddMuscle />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-exercise"
        element={
          <ProtectedRoute>
            <AddExercise />
          </ProtectedRoute>
        }
      />

      {/* Redirect to login by default */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
