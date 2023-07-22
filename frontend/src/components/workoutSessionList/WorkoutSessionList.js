import React, {useEffect, useState} from 'react'
import { Card, CardHeader, CardContent, Typography } from '@mui/material';


function WorkoutSessionList() {
    const [workoutSessions, setWorkoutSessions] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api')  
            .then(response => response.json())
            .then(data => setWorkoutSessions(data));
    }, []);
    
    return (

        workoutSessions.map(session => (
            <Card key={session.id} sx={{ margin: 'auto', marginBottom: '16px', maxWidth: '400px', marginTop: '16px'}}>
                <CardHeader title={`Workout: ${session.id}`} sx={{ textAlign: 'center' }} />
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography>{`${session.date}, ${session.duration}`}</Typography>
                    <Typography>{session.notes}</Typography>
                    <Typography variant="h6">Exercises:</Typography>
                    {session.exercises.map(exercise => (
                        <div key={exercise.id} sx={{ marginLeft: '16px' }}>
                            <Typography variant="subtitle1">{`Name: ${exercise.name}`}</Typography>
                            {exercise.set.map((s, i) => (
                                <div key={s.id} sx={{ marginLeft: '16px' }}>
                                    <Typography>{`Set: ${i + 1}`}</Typography>
                                    <Typography>{`Reps: ${s.reps}`}</Typography>
                                    <Typography>{`Rpe: ${s.rpe}`}</Typography>
                                    <Typography>{`Weight: ${s.weight}`}</Typography>
                                </div>
                            ))}
                        </div>
                    ))}
                </CardContent>
            </Card>
        ))
    );
}

export default WorkoutSessionList
