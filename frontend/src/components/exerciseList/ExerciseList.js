import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Button } from '@mui/material';
import App from '../../App';
import './styles.css';

function ExerciseList() {

    const [exerciseList, setExerciseList] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/exercises')
            .then(response => response.json())
            .then(data => setExerciseList(data));
    }, []);

    return (
        <div className="exercise-list">
            {exerciseList.map(exercise => (
            <Card key={exercise.id} sx={{ margin: 'auto', marginBottom: '16px', maxWidth: '200px', marginTop: '16px' }}>
                <CardHeader title={`${exercise.name}`} sx={{ textAlign: 'center' }} />
                <CardContent sx={{ textAlign: 'center' }}>
                    {/*<img src={exercise.gifUrl} alt={exercise.name} style={{ width: '100%', height: 'auto' }} />*/}
                    <Typography>{`Targets: ${exercise.target}`}</Typography>
                    <Typography>{`Equipments: ${exercise.equipment}`}</Typography>
                </CardContent>
            </Card>
        ))}
        </div>
    );
}

export default ExerciseList



