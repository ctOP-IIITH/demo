import React, { useState, useContext } from 'react';
import { DataContext } from '../App'; // Import DataContext
import { Box, TextField, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Verticals = () => {
  const { nodesData } = useContext(DataContext); // Access nodes data from context
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  let filteredVerticals = nodesData.verticals?.filter((vertical) =>
    vertical.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerticalClick = (verticalName) => {
    navigate(`/nodes?filter=${encodeURIComponent(verticalName)}`);
  };

  filteredVerticals = filteredVerticals || [];

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="Search Verticals"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredVerticals.map((vertical, index) => (
        <Card
          key={index}
          sx={{ mb: 2 }}
          onClick={() => handleVerticalClick(vertical.name)} // Add click handler
          // Add cursor pointer
          style={{ cursor: 'pointer' }}>
          <CardContent>
            <Typography variant="h5">{vertical.name}</Typography>
            {/* Additional details can be displayed here */}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Verticals;
