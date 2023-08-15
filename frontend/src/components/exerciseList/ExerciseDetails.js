import React, { useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';
import './styles.css';

function ExerciseDetail() {

    const { id } = useParams();
    const [exercise, setExercise] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/exercises/${id}`)
            .then(response => response.json())
            .then(data =>  setExercise(data))
    }, []);

    useEffect(() => {
        if (exercise && exercise.name) {
            fetch(`http://127.0.0.1:8000/related_videos/${exercise.name}`)
                .then(response => response.json())
                .then(data => setVideos(data.items))
        }
    }, [exercise])
    


    return (
        !exercise ? <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box> :
        <div className="exercise-view">
            <img src={exercise.gifUrl} className="exercise"/>
        </div>
    );
}

export default ExerciseDetail