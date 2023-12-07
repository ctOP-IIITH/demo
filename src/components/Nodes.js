import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../App'; // Adjust the path as necessary
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const Nodes = () => {
  const { nodesData, updateNodesData } = useContext(DataContext); // Access nodes data from context
  const [selectedVertical, setSelectedVertical] = useState('');
  const [apiUrls, setApiUrls] = useState({}); // To store API URLs for each node
  const [showTextField, setShowTextField] = useState({}); // To control the visibility of text fields

  const location = useLocation();
  const navigate = useNavigate();

  const handleVerticalClick = (nodeName) => {
    navigate(`/nodes/${encodeURIComponent(nodeName)}`);
  };

  useEffect(() => {
    // Check for URL parameter and update state
    const params = new URLSearchParams(location.search);
    const filter = params.get('filter');
    if (filter && nodesData.verticals.some((v) => v.name === filter)) {
      setSelectedVertical(filter);
    }
  }, [location.search, nodesData.verticals]);

  const handleVerticalChange = (event) => {
    setSelectedVertical(event.target.value);
  };

  const handleSubscribeClick = (nodeName) => {
    setShowTextField({ ...showTextField, [nodeName]: true });
  };

  const handleApiUrlChange = (nodeName, value) => {
    setApiUrls({ ...apiUrls, [nodeName]: value });
  };

  const handleSubmitSubscription = (nodeName) => {
    // Add api url to nodesData[verticals][nodes][nodeName][subscriptions]
    nodesData.verticals.forEach((vertical) => {
      vertical.nodes.forEach((node) => {
        if (node.nodeName === nodeName) {
          node.subscriptions.push(apiUrls[nodeName]);
        }
      });
    });

    // Update nodesData
    updateNodesData({ ...nodesData });

    // Here you can add logic to actually send the subscription request if needed
    Swal.fire({
      title: 'Subscribed Successfully!',
      text: `You have subscribed to ${nodeName} with API URL: ${apiUrls[nodeName]}`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
    setShowTextField({ ...showTextField, [nodeName]: false });
  };

  const filteredNodes = selectedVertical
    ? nodesData.verticals.filter((vertical) => vertical.name === selectedVertical)[0]?.nodes || []
    : nodesData.verticals.flatMap((vertical) => vertical.nodes);

  return (
    <Box sx={{ p: 3 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Filter by Vertical</InputLabel>
        <Select value={selectedVertical} label="Filter by Vertical" onChange={handleVerticalChange}>
          <MenuItem value="">All</MenuItem>
          {nodesData.verticals.map((vertical, index) => (
            <MenuItem key={index} value={vertical.name}>
              {vertical.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {filteredNodes.map((node, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ display: 'inline-block', mr: 2 }}>
              {node.nodeName}
            </Typography>
            {showTextField[node.nodeName] ? (
              <Box sx={{ display: 'inline-block' }}>
                <TextField
                  size="small"
                  label="API URL"
                  variant="outlined"
                  onChange={(e) => handleApiUrlChange(node.nodeName, e.target.value)}
                  sx={{ mr: 1 }}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleSubmitSubscription(node.nodeName)}>
                  Subscribe
                </Button>
              </Box>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleSubscribeClick(node.nodeName)}>
                Subscribe
              </Button>
            )}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleVerticalClick(node.nodeName)}>
              View Node Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Nodes;
