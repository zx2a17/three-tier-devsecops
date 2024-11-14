import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, List, ListItem, ListItemText } from '@mui/material';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const response = await axios.get('http://localhost:8000/api/notes/');
        setNotes(response.data);
    };

    const addNote = async () => {
        const response = await axios.post('http://localhost:8000/api/notes/', { title, content });
        setNotes([...notes, response.data]);
        setTitle('');
        setContent('');
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Notes
            </Typography>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Content"
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={addNote}>
                    Add Note
                </Button>
            </Box>
            <List>
                {notes.map((note) => (
                    <ListItem key={note.id} divider>
                        <ListItemText primary={note.title} secondary={note.content} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Notes;
