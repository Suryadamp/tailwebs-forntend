import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, InputAdornment, Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { PersonOutline ,Bookmark,MenuBook} from '@mui/icons-material';
import { useToken } from '../Context/TokenContext';

const AddStudentDialog = ({ open, onClose, onStudentAdded, data }) => {
  console.log(data)
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState();
  const {token} = useToken();
  const [aOpen, setAOpen] = useState(false);
  const [severity, setSeverity] = useState('success'); // 'success', 'info', 'warning', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setSubject(data.subject || '');
      setMarks(data.marks);
    }
  }, [data]);

  const handleAddStudent = async () => {
    // let query = data._id ? `edit/:${data._id}`: 'create'
    const url = data._id 
    ? `http://localhost:5000/api/students/edit/${data._id}` 
    : 'http://localhost:5000/api/students/create';
  const method = data._id ? 'PUT' : 'POST';
    try {
      const response = await axios({
        method,
        url,
        data: { name, subject, marks }, // Request body
        headers: {
          'Authorization': `Bearer ${token}`, // Request headers
          'Content-Type': 'application/json', // Optional: specify content type if necessary
        },
      });
      setAOpen(true);
      setSeverity('success');
      setMessage(response.data.message);
      // onStudentAdded(response.data); // Assuming `onStudentAdded` is a function to handle the response
      onClose()
    } catch (error) {
      setAOpen(true);
      setSeverity('error');
      setMessage(error.response.data.message);
      console.error('Error adding student:', error);
      // Handle error appropriately

    }
  };

  const handleClose = () => {
    setAOpen(false);
  };

  return (
    <>
    <Dialog open={open} onClose={onClose}      sx={{
        '& .MuiDialog-paper': {
          width: '600px', 
          maxWidth: '90%', 
        },
      }} >
      <DialogContent >
  
             <Box mb={2}>
            <Typography>Name</Typography>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
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
             <Box mb={2}>
            <Typography>Subject</Typography>
            <TextField
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MenuBook />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
             <Box mb={2}>
            <Typography>Marks</Typography>
            <TextField
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Bookmark />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
      </DialogContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Button
          onClick={handleAddStudent}
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            width:'50%',
            marginBottom:2,
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Add
        </Button>
      </Box>
    </Dialog>
       <Snackbar
       open={aOpen}
       autoHideDuration={6000} // Duration in milliseconds
       onClose={handleClose}
     >
       <Alert
         onClose={handleClose}
         severity={severity}
         sx={{ width: '100%' }}
       >
         {message}
       </Alert>
     </Snackbar>
     </>
  );
};

export default AddStudentDialog;
