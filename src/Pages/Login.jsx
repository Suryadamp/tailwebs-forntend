import React, { useState } from 'react';
import {
    TextField, Button, Box, Typography, Card, CardContent, InputAdornment, IconButton
  } from '@mui/material';
  import { PersonOutline, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
  
  const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
  
    const handleTogglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
  
    const handleLogin = async () => {

      if(username === '' || password === ''){
        setError('username or password is empty');
        return
      }

      try {
        const resp = await axios.post('http://localhost:5000/api/users/login',{username,password})
        onLoginSuccess(resp.data.token);
      } catch (err) {
        setError('Invalid credentials. Please try again.');
      }
    }
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      bgcolor="#f0f0f0"
    >
      <Typography
        variant="h3"
        color="red"
        gutterBottom
        textAlign="center"
      >
        tailwebs.
      </Typography>
      
      <Card style={{ width: '30%', padding: '5%' }}>
        <CardContent>
          <Box mb={2}>
            <Typography>Username</Typography>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          <Box mb={1}>
          <Typography>Password</Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box mb={2} textAlign="right" color={'blue'}>
              Forgot Password?
          </Box>

          {error && <Typography color="error">{error}</Typography>}
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
