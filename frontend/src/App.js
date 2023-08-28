import React from 'react';
import NavBar from './components/nBar/NBar';
import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";
import WorkoutSessionList from './components/workoutSessionList/WorkoutSessionList'
import ExerciseList from './components/exerciseList/ExerciseList';
import ExerciseDetail from './components/exerciseList/ExerciseDetails';
import CreateWorkout from './components/newWorkout/newWorkout';
import Login from './components/login';
import SignUp from './components/signup';
import PrivateRoute from './utils/privateRoute';
import { AuthProvider } from './context/authContext';



function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/workouts" element={<PrivateRoute><WorkoutSessionList /></PrivateRoute>} />
          <Route path="/exercises" element={<PrivateRoute><ExerciseList /></PrivateRoute>} />
          <Route path="/exercises/:id" element={<PrivateRoute><ExerciseDetail /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreateWorkout /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
