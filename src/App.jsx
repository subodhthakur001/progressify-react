import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddMuscle from './pages/AddMuscle';
import AddExercises from './pages/AddExercises';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/add-muscle"
          element={
            <ProtectedRoute>
              <AddMuscle />
            </ProtectedRoute>
          }
        />
        <Route
        path="/add-exercise/:muscleName/:muscleId"
        element={
          <ProtectedRoute>
            <AddExercises/>
          </ProtectedRoute>
        }
        />
        <Route path="*" element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
