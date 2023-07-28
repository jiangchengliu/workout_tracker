import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, TextField } from '@mui/material';
import './styles.css';


function ExerciseList() {

    const [exerciseList, setExerciseList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('http://127.0.0.1:8000/exercises')
            .then(response => response.json())
            .then(data => setExerciseList(data));
    }, []);

    const inputHandler = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredExercises = exerciseList.filter(exercise => exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="search-field">
                <TextField id="filled-basic" label="Search for a exercise" variant="filled" value={searchTerm} onChange={inputHandler} style={{ width: '75%'}} />
            </div>
            <div className="exercise-list">
                {filteredExercises.map(exercise => (
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
        </div>
    );
}

export default ExerciseList



