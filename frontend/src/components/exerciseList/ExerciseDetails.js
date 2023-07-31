import React, { useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

function ExerciseDetail() {

    const { id } = useParams();
    console.log("ExerciseDetail id: ", id);

    const [exercise, setExercise] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/exercises/${id}`)
            .then(response => response.json())
            .then(data =>  setExercise(data))
    }, []);


    return (
        !exercise ? <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box> :
        <div>
            <img src={exercise.gifUrl} />
        </div>
    );
}

export default ExerciseDetail