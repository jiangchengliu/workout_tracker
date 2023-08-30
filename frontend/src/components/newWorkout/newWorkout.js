import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FormControl, TextField, Button, FormGroup, Dialog,
    DialogActions, DialogContent, DialogTitle, List, ListItem,
    ListItemText, ListItemButton, IconButton
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import './styles.css';
import AuthContext from '../../context/authContext';
import jwtDecode from 'jwt-decode';




function CreateWorkout() {

    const [exercises, setExercises] = useState([]);
    const [duration, setDuration] = useState('');
    const [notes, setNotes] = useState('');
    const [exerciseOptions, setExerciseOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { authTokens } = useContext(AuthContext);
    
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://127.0.0.1:8000/exercises')
            .then(response => response.json())
            .then(data => {
                const formattedOptions = data.map(exercise => ({
                    value: exercise.name,
                    label: exercise.name,
                }));
                setExerciseOptions(formattedOptions);
            });
    }, []);

    const inputHandler = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredExercises = exerciseOptions.filter(exercise => exercise.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExerciseOpen = () => {
        setOpen(true);
        setSearchTerm("");
    }

    const handleExerciseClose = () => {
        setOpen(false);
    }

    const addExercise = (exercise) => {
        setExercises([...exercises, { name: exercise.label, sets: [] }]);
        handleExerciseClose();
    }

    const deleteExercise = (index) => {
        const currentExercises = [...exercises];
        currentExercises.splice(index, 1);
        setExercises(currentExercises);

    }

    const deleteSet = (eIndex, sIndex) => {
        const currentExercises = [...exercises];
        currentExercises[eIndex].sets.splice(sIndex, 1);
        setExercises(currentExercises);

    }


    const addSet = (index) => {
        const currentExercises = [...exercises];
        currentExercises[index].sets.push({ reps: "", rpe: "", weight: "" });
        setExercises(currentExercises);
    }

    const handleSetChange = (e, eIndex, sIndex, category) => {
        const currentExercises = [...exercises];
        currentExercises[eIndex].sets[sIndex][category] = e.target.value;
        setExercises(currentExercises);

    }

    const cancelWorkout = () => {
        setExercises([]);
        setNotes('');
        setDuration('');

    }

    const saveWorkout = () => {
        const decodeToken = jwtDecode(authTokens.access);
        const userId = decodeToken.user_id;
        const data = {
            user: userId,
            duration: duration,
            notes: notes,
            exercises: exercises
        };

        data.exercises.forEach(exercise => {
            exercise.sets.forEach(set => {
                if (set.weight === "") {
                    set.weight = null;
                }
            });
        });

        fetch('http://127.0.0.1:8000/workouts/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                navigate("/workouts");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        console.log(exercises);
    }, [exercises]);



    return (
        <div className='form-container'>
            <h1>New Workout</h1>
            <FormControl className='workout-form'>
                <TextField label="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                <TextField label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                {exercises.map((exercise, eIndex) => (
                    <div className='logged-exercise' key={eIndex}>
                        <h3>{exercise.name}</h3>
                        <IconButton variant="contained" color="error" aria-label="delete-button" onClick={() => deleteExercise(eIndex)}>
                            <DeleteIcon />
                        </IconButton>
                        {exercise.sets.map((set, sIndex) => (
                            <div key={sIndex}>
                                <TextField label="Weight" onChange={(e) => handleSetChange(e, eIndex, sIndex, 'weight')} />
                                <TextField label="Reps" onChange={(e) => handleSetChange(e, eIndex, sIndex, 'reps')} />
                                <TextField label="Rpe" onChange={(e) => handleSetChange(e, eIndex, sIndex, 'rpe')} />
                                <IconButton variant="contained" color="error" aria-label="delete-button" onClick={() => deleteSet(eIndex, sIndex)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ))}
                        <Button onClick={() => addSet(eIndex)}>Add Set</Button>
                    </div>
                ))}
                <Button onClick={handleExerciseOpen}>Add Exercise</Button>
                <Button onClick={cancelWorkout}>Cancel Workout</Button>
                <Button onClick={saveWorkout}>Save Workout</Button>

                <Dialog open={open} onClose={handleExerciseClose}>
                    <DialogTitle> Choose an Exercise</DialogTitle>
                    <DialogContent>
                    <TextField id="filled-basic" label="Search for a exercise" variant="outlined" value={searchTerm} onChange={inputHandler} fullWidth />
                        <List>
                            {filteredExercises.map((option, index) => (
                                <ListItemButton onClick={() => addExercise(option)} key={index}>
                                    <ListItemText primary={option.label} />
                                </ListItemButton>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleExerciseClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </FormControl>
        </div>
    );
};



export default CreateWorkout;
