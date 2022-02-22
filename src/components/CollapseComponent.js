/* eslint-disable react/prop-types */
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

const CollapseComponent = ({ children, title, handleOpen, open, style }) => (
  <List className={style}>
    {/* <List className="container-create-confirmation-list"> */}
    <ListItemButton onClick={handleOpen}>
      <ListItemText className="create-confirmation-title" primary={title} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText>{children}</ListItemText>
        </ListItemButton>
      </List>
    </Collapse>
  </List>
);

export default CollapseComponent;
