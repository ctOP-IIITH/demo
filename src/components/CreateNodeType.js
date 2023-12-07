import React, { useState, useContext } from 'react';
import { DataContext } from '../App'; // Adjust the path as necessary
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateNodeType = () => {
  const [nodeTypeName, setNodeTypeName] = useState('');
  const [parameters, setParameters] = useState([]);
  const [selectedVertical, setSelectedVertical] = useState('');

  const { nodesData, updateNodesData } = useContext(DataContext);

  const handleAddParameter = () => {
    setParameters([...parameters, { name: '', dataType: '' }]);
  };

  const handleParameterChange = (index, field, value) => {
    const newParameters = [...parameters];
    newParameters[index][field] = value;
    setParameters(newParameters);
  };

  const handleRemoveParameter = (index) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedVertical || !nodeTypeName) {
      // Handle the case where no vertical or node type name is selected
      // You might want to show an error message here
      return;
    }

    // Construct the new node type object
    const newNodeType = { [nodeTypeName]: parameters.map((param) => param.name) };

    const updatedVerticals = nodesData.verticals.map((vertical) => {
      if (vertical.name === selectedVertical) {
        // If the vertical already has nodeTypes, add to them; otherwise, create new
        return {
          ...vertical,
          nodeTypes: { ...vertical.nodeTypes, ...newNodeType }
        };
      }
      return vertical;
    });

    const newNodesData = { ...nodesData, verticals: updatedVerticals };
    updateNodesData(newNodesData);

    // Reset form fields
    setNodeTypeName('');
    setParameters([]);
    setSelectedVertical('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Create New Node Type</Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-vertical-label">Select Vertical</InputLabel>
          <Select
            labelId="select-vertical-label"
            value={selectedVertical}
            label="Select Vertical"
            onChange={(e) => setSelectedVertical(e.target.value)}>
            {nodesData.verticals.map((vertical, index) => (
              <MenuItem key={index} value={vertical.name}>
                {vertical.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Node Type Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nodeTypeName}
          onChange={(e) => setNodeTypeName(e.target.value)}
        />

        {parameters.map((param, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <TextField
              label="Parameter Name"
              variant="outlined"
              value={param.name}
              onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
              sx={{ mr: 1, flex: 1 }}
            />
            <FormControl variant="outlined" sx={{ mr: 1, flex: 1 }}>
              <InputLabel>Data Type</InputLabel>
              <Select
                value={param.dataType}
                onChange={(e) => handleParameterChange(index, 'dataType', e.target.value)}
                label="Data Type">
                <MenuItem value="Number">Number</MenuItem>
                <MenuItem value="String">String</MenuItem>
                <MenuItem value="Boolean">Boolean</MenuItem>
                {/* Add more data types as needed */}
              </Select>
            </FormControl>
            <IconButton onClick={() => handleRemoveParameter(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddParameter} sx={{ mt: 2 }}>
          Add Parameter
        </Button>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Node Type
        </Button>
      </form>
    </Box>
  );
};

export default CreateNodeType;
