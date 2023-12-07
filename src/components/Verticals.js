import React, { useState, useContext } from 'react';
import { DataContext } from '../App'; // Import DataContext
import { Box, TextField, Card, CardContent, Typography, CardActionArea } from '@mui/material';
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
        <Card key={index} sx={{ mb: 2, boxShadow: 3 }}>
          <CardActionArea onClick={() => handleVerticalClick(vertical.name)}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {vertical.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {vertical.description ? vertical.description : 'No description available'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default Verticals;
