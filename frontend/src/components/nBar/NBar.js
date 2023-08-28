import { AppBar, IconButton, Toolbar, Typography, Stack, Button } from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/authContext';



function NavBar() {

    const { user, logoutUser } = useContext(AuthContext);


    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <FitnessCenterIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Workout Tracker
                </Typography>
                {user ? (
                    <>
                        <Button color='inherit' component={RouterLink} to="/workouts">History</Button>
                        <Button color='inherit' component={RouterLink} to="/create">New Workout</Button>
                        <Button color='inherit' component={RouterLink} to="/exercises">Exercises</Button>
                        <Button color='inherit' onClick={logoutUser}>Logout</Button>
                    </>
                ) : (
                    <Button color='inherit' component={RouterLink} to="/login">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;