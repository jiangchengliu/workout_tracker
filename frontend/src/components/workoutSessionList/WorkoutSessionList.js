import React, { useContext, useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import AuthContext from '../../context/authContext';
import './styles.css';

function WorkoutSessionList() {

    const [workoutSessions, setWorkoutSessions] = useState([])
    const { authTokens } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/workouts/', {
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setWorkoutSessions(data);
                console.log(data);
            });

    }, []);

    const deleteWorkoutSession = (id) => {

        fetch(`http://127.0.0.1:8000/workouts/${id}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setWorkoutSessions(workoutSessions.filter(session => session.id !== id))
                    console.log("Deleted!")
                } else {
                    throw new Error('Could not delete');
                }
            })
            .catch(error => console.log(error));
    }


    return (
        <div className='workout-list'>
            {workoutSessions.length > 0 ? (
                workoutSessions.map(session => (
                    <Card key={session.id} sx={{ margin: 'auto', marginBottom: '16px', width: '400px', marginTop: '16px' }}>
                        <CardHeader
                            title="Workout"
                            subheader={
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontStyle: 'italic',
                                        textAlign: 'left'
                                    }}>
                                    {`${session.date} | ${session.duration}`}
                                </Typography>
                            }
                            action={
                                <IconButton variant="contained" color="error" aria-label="delete-button" onClick={() => deleteWorkoutSession(session.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        />
                        <CardContent sx={{ textAlign: 'left' }}>
                            <Typography sx={{ marginBottom: '16px' }}>{session.notes}</Typography>
                            <Typography variant="h6">Exercises:</Typography>
                            {session.exercises.map(exercise => (
                                <div key={exercise.id} sx={{ marginLeft: '16px' }}>
                                    <Typography variant="subtitle1">{`${exercise.name}`}</Typography>
                                    {exercise.sets.map((s, i) => (
                                        <div key={s.id} sx={{ marginLeft: '16px' }}>
                                            <Typography>{`${i + 1} sets x ${s.reps} reps ${s.weight ? `x ${s.weight} lb x` : ''} @ rpe ${s.rpe}`}</Typography>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography variant="h5" align="center" sx={{ marginTop: '16px' }}>
                    No workouts yet. Start adding new workouts!
                </Typography>
            )}
        </div>
    );

}

export default WorkoutSessionList
