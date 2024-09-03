import React from 'react';
import { Toolbar, Typography, Button, Box } from '@mui/material';

const Header = ({ onLogout }) => {
  return (
    <Box position="static" sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Typography variant="h6"  sx={{ flexGrow: 1 , color:'red'}}>
          tailwebs.
        </Typography>
        <Box>
          <Button color="inherit" sx={{ marginRight: 2 }}>
            Home
          </Button>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Header;
