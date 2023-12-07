import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit'; // New icon for Verticals
import AccountTreeIcon from '@mui/icons-material/AccountTree'; // New icon for Nodes
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // New icon for Create pages

import { useNavigate } from 'react-router-dom'; // Import useNavigate

function MainListItems() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleItemClick = (path) => {
    navigate(path); // Use navigate to navigate to the specified path
  };

  return (
    <>
      <ListItemButton onClick={() => handleItemClick('/')}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>

      <ListItemButton onClick={() => handleItemClick('/verticals')}>
        <ListItemIcon>
          <VerticalSplitIcon />
        </ListItemIcon>
        <ListItemText primary="Verticals" />
      </ListItemButton>

      <ListItemButton onClick={() => handleItemClick('/nodes')}>
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary="Nodes" />
      </ListItemButton>

      <ListItemButton onClick={() => handleItemClick('/create-vertical')}>
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Create Vertical" />
      </ListItemButton>

      <ListItemButton onClick={() => handleItemClick('/create-node-type')}>
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Create Node Type" />
      </ListItemButton>

      <ListItemButton onClick={() => handleItemClick('/create-node')}>
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Create Node" />
      </ListItemButton>

      <ListItemButton onClick={() => handleItemClick('/private')}>
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText primary="Private" />
      </ListItemButton>
    </>
  );
}

export default MainListItems;
