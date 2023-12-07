import React, { useState, useContext } from 'react';
import { DataContext } from '../App'; // Adjust the path as necessary
import { Box, TextField, Button, Typography } from '@mui/material';
import Swal from 'sweetalert2'; // For alert messages

const CreateVertical = () => {
  const [verticalName, setVerticalName] = useState('');
  const [description, setDescription] = useState('');
  const { updateNodesData } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add logic to update the global state or send data to backend
    const newVertical = {
      name: verticalName,
      description: description,
      nodes: [], // Assuming new vertical has no nodes initially
      nodeTypes: {} // Assuming new vertical has no nodeTypes initially
    };

    // Example: Update the context
    updateNodesData((prevData) => ({
      ...prevData,
      verticals: [...prevData.verticals, newVertical]
    }));

    // Reset form fields
    setVerticalName('');
    setDescription('');

    // Show success message
    Swal.fire({
      title: 'Success!',
      text: 'New vertical created successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Create New Vertical</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Vertical Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={verticalName}
          onChange={(e) => setVerticalName(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Vertical
        </Button>
      </form>
    </Box>
  );
};

export default CreateVertical;
