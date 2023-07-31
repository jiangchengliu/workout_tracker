import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Typography, TextField, CircularProgress, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import './styles.css';


function ExerciseList() {

    const [exerciseList, setExerciseList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/exercises')
            .then(response => response.json())
            .then(data => { setExerciseList(data); setIsLoading(false); })
    }, []);

    const inputHandler = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredExercises = exerciseList.filter(exercise => exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        isLoading ? <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box> :
            <div>
                <div className="search-field">
                    <TextField id="filled-basic" label="Search for a exercise" variant="outlined" value={searchTerm} onChange={inputHandler} style={{ width: '75%' }} />
                </div>
                <div className="exercise-list">
                    {filteredExercises.map(exercise => (
                        <Card key={exercise.id} sx={{ margin: 'auto', marginBottom: '16px', width: '200px', marginTop: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <CardHeader title={`${exercise.name}`} sx={{ textAlign: 'center' }} />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography>{`Targets: ${exercise.target}`}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button component={RouterLink} to= {`/exercises/${exercise.id}`}>More</Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </div>
    );
}

export default ExerciseList



