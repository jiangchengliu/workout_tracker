import React, {useEffect, useState} from 'react'

function WorkoutSessionList() {
    const [workoutSessions, setWorkoutSessions] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api')  
            .then(response => response.json())
            .then(data => setWorkoutSessions(data));
    }, []);
    
    return (
        workoutSessions.map(session => (
            <div key={session.id}>
                <h3>Workout: {session.id} </h3>
                <p>{session.date}, {session.duration}</p>
                <p>{session.notes}</p>
                <h3>Exercises: </h3>
                    {session.exercises.map(exercise => (
                        <div key={exercise.id}>
                            <p>Name: {exercise.name}</p>
                            {exercise.set.map((s,i) => (
                                <div key={s.id}>
                                    <p>Set: {i + 1}</p>
                                    <p>Reps: {s.reps}</p>
                                    <p>Rpe: {s.rpe}</p>
                                    <p>Weight: {s.weight}</p>
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        ))
    );
}

export default WorkoutSessionList
