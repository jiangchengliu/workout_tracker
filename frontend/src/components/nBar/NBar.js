import { AppBar, IconButton, Toolbar, Typography, Stack, Button } from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from "react-router-dom";
import WorkoutSessionList from '../workoutSessionList/WorkoutSessionList';


function NavBar() {
    return (
        <Router>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                        <FitnessCenterIcon />
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        Workout Tracker
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        <Button color='inherit' component={RouterLink} to="/workouts">History</Button>
                        <Button color='inherit' component={RouterLink} to="/create">New Workout</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/workouts" element={<WorkoutSessionList />} />
            </Routes>
        </Router>
    );
}

export default NavBar;