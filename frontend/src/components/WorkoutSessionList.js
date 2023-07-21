import React, {useEffect, useState} from 'react'

function WorkoutSessionList() {
    const [workoutSessions, setWorkoutSessions] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api')  // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => setWorkoutSessions(data));
    }, []);
    
    return (
        workoutSessions.map(session => (
            <div key={session.id}>
                <h2>{session.date}, {session.duration}</h2>
                <p>{session.notes}</p>
                <h3>Exercises: </h3>
                    {session.exercises.map(exercise => (
                        <div key={exercise.id}>
                            <p>Name: {exercise.name}</p>
                            <p>Sets: {exercise.sets}</p>
                            <p>Reps: {exercise.reps}</p>
                            <p>Rpe: {exercise.rpe}</p>
                            <p>Weight: {exercise.weight}</p>
                        </div>
                    ))}
            </div>
        ))
    );
}

export default WorkoutSessionList
