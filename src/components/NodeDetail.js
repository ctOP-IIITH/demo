import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../App'; // Adjust the path as necessary
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  TextField,
  Button
} from '@mui/material';
import { CodeBlock, dracula } from 'react-code-blocks'; // You may need to install a package for code blocks
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const NodeDetail = () => {
  const { id } = useParams();
  const { nodesData, updateNodesData } = useContext(DataContext);
  const node = nodesData.verticals.flatMap((v) => v.nodes).find((n) => n.nodeName === id);
  const [subscriptions, setSubscriptions] = useState(node.subscriptions || []);
  const [newData, setNewData] = useState({});
  const [showForm, setShowForm] = useState(false);

  if (!node) {
    return <Typography variant="h5">Node not found</Typography>;
  }

  const handleRemoveSubscription = (urlToRemove) => {
    const updatedSubscriptions = subscriptions.filter((url) => url !== urlToRemove);
    setSubscriptions(updatedSubscriptions);
    // Update nodesData
    nodesData.verticals.forEach((vertical) => {
      vertical.nodes.forEach((node) => {
        if (node.nodeName === id) {
          node.subscriptions = updatedSubscriptions;
        }
      });
    });
    updateNodesData(nodesData);
  };

  const handleAddData = (e) => {
    e.preventDefault();

    // Add logic to validate newData here if needed

    // Update the node's data
    const updatedNodeData = [...data, newData];

    // Update nodesData
    nodesData.verticals.forEach((vertical) => {
      vertical.nodes.forEach((node) => {
        if (node.nodeName === id) {
          node.data.push(newData);
        }
      });
    });

    updateNodesData(nodesData);

    // Reset the newData state
    setNewData({});
  };

  const { nodeName, nodeType, data } = node;
  const nodeTypeParams = nodesData.verticals.find((v) => v.nodeTypes[nodeType]).nodeTypes[nodeType];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{nodeName}</Typography>
      <Typography variant="h6">Node Type: {nodeType}</Typography>
      <Typography variant="body1">Parameters: {nodeTypeParams.join(', ')}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        API Endpoint with Example:
      </Typography>
      <Card variant="outlined" sx={{ my: 2 }}>
        <CardContent>
          <Typography variant="h6">{`POST https://api.example.com/ndoes/${nodeName}`}</Typography>
          <Typography variant="body1">Summary: Create a new node</Typography>
          <Typography variant="body1">Body:</Typography>
          <CodeBlock
            text={`{\n${nodeTypeParams.map((p) => `  "${p}": "number"`).join(',\n')}\n}`}
            language="json"
            showLineNumbers
            theme={dracula}
          />
          <Typography variant="body1">Responses:</Typography>
          <CodeBlock
            text={`201 Created\n{\n${nodeTypeParams
              .map((p) => `  "${p}": "value"`)
              .join(',\n')}\n}`}
            language="json"
            showLineNumbers
            theme={dracula}
          />
        </CardContent>
      </Card>

      {/* Subscriptions Section */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Subscriptions:
      </Typography>
      {subscriptions.length > 0 ? (
        subscriptions.map((url, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {index + 1}. {url}
            </Typography>
            <IconButton onClick={() => handleRemoveSubscription(url)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))
      ) : (
        <Typography variant="body2">No subscriptions available</Typography>
      )}

      <Typography variant="h6" sx={{ mt: 2 }}>
        Node Data:
      </Typography>
      {/* Table for Node Data */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {nodeTypeParams.map((param, index) => (
                <TableCell key={index}>{param}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {nodeTypeParams.map((param, idx) => (
                  <TableCell key={idx}>{row[param]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : 'Add Data'}
        </Button>
      </Box>
      {showForm && nodesData && (
        <Box component="form" onSubmit={handleAddData} sx={{ mt: 2 }}>
          <Typography variant="h6">Add New Data</Typography>
          {nodeTypeParams &&
            nodeTypeParams.map((param, index) => (
              <TextField
                key={index}
                label={param}
                variant="outlined"
                fullWidth
                margin="normal"
                value={newData[param] || ''}
                onChange={(e) => setNewData({ ...newData, [param]: e.target.value })}
              />
            ))}
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NodeDetail;
