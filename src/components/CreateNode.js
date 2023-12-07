import React, { useState, useContext } from 'react';
import { DataContext } from '../App'; // Adjust the path as necessary
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const CreateNode = () => {
  const [selectedVertical, setSelectedVertical] = useState('');
  const [selectedNodeType, setSelectedNodeType] = useState('');
  const [nodeName, setNodeName] = useState('');
  const { nodesData, updateNodesData } = useContext(DataContext);

  const handleVerticalChange = (event) => {
    setSelectedVertical(event.target.value);
    setSelectedNodeType(''); // Reset node type selection when vertical changes
  };

  const handleNodeTypeChange = (event) => {
    setSelectedNodeType(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedVertical || !selectedNodeType || !nodeName) {
      // Handle validation error
      return;
    }

    const newNode = { nodeName, nodeType: selectedNodeType, data: [] }; // Assuming data is an array

    const updatedVerticals = nodesData.verticals.map((vertical) => {
      if (vertical.name === selectedVertical) {
        return {
          ...vertical,
          nodes: [...vertical.nodes, newNode]
        };
      }
      return vertical;
    });

    updateNodesData({ ...nodesData, verticals: updatedVerticals });

    // Reset form fields
    setSelectedVertical('');
    setSelectedNodeType('');
    setNodeName('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Create New Node</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-vertical-label">Select Vertical</InputLabel>
          <Select
            labelId="select-vertical-label"
            value={selectedVertical}
            label="Select Vertical"
            onChange={handleVerticalChange}>
            {nodesData.verticals.map((vertical, index) => (
              <MenuItem key={index} value={vertical.name}>
                {vertical.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="select-node-type-label">Select Node Type</InputLabel>
          <Select
            labelId="select-node-type-label"
            value={selectedNodeType}
            label="Select Node Type"
            onChange={handleNodeTypeChange}
            disabled={!selectedVertical}>
            {selectedVertical &&
              Object.keys(
                nodesData.verticals.find((v) => v.name === selectedVertical).nodeTypes || {}
              ).map((nodeType, index) => (
                <MenuItem key={index} value={nodeType}>
                  {nodeType}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          label="Node Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Node
        </Button>
      </form>
    </Box>
  );
};

export default CreateNode;
