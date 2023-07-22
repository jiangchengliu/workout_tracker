import React from 'react';
import WorkoutSessionList from './components/workoutSessionList/WorkoutSessionList';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/workouts">History</Link>
            </li>
            <li>
              <Link to="/create">Create Workout Session</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/workouts" element={<WorkoutSessionList />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;