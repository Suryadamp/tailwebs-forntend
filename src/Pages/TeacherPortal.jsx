import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Typography, IconButton, Avatar, Tooltip, MenuItem, Popover, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Header from '../Components/Header/Header';
import AddStudentDialog from '../Components/Modals/AddStudentDialog';
import { ExpandCircleDown } from '@mui/icons-material';
import { useToken } from '../Components/Context/TokenContext';
const TeacherPortal = () => {
  const [students, setStudents] = useState([
]);
  const [studentView, setStudentView] = useState({});
  const [dailog,setDailog] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(null);
  const {token,setToken} = useToken();
  const [aOpen, setAOpen] = useState(false);
  const [severity, setSeverity] = useState('success'); // 'success', 'info', 'warning', 'error'
  const [message, setMessage] = useState('');

  const handleMouseEnter = (index) => {
    if(index === hoverIndex){
      setHoverIndex(null);
    }else{
      setHoverIndex(index);
    }
  };


  const fetchStudents = async () => {
    setHoverIndex(null);
    try {
      const response = await axios.get('http://localhost:5000/api/students', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setStudents(response.data.students); 
    
    } catch (err) {
      console.error('Error fetching students:', err);
    
      setStudents([]); // Clear the students state on error
    }
  };


  useEffect(() => {


    fetchStudents();
  }, [token]);




  const handleEdit = (data) => {
    
    setStudentView(data)
    setDailog(true)
    
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/students/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setHoverIndex(null);
      setAOpen(true);
      setSeverity('success');
      setMessage(response.data.message);
      fetchStudents();
    } catch (err) {
      console.error('Error fetching students:', err);
      setAOpen(true);
      setSeverity('error');
      setMessage(err.response.data.message);
    }
  };

  const handleClose = () => {
    setAOpen(false);
  };

  const handleLogout = () => {
    // Implement logout functionality
    setToken(null)
  };



  return (
    <Box padding={'5%'}>
        <Header onLogout={handleLogout} />
      <Box     height="100%"
      flexDirection="column"
      bgcolor="#f0f0f0" padding={'2%'}>
      <Table  sx={{backgroundColor:'white' }}>
        <TableHead>
          <TableRow>
     
            <TableCell>
              <Box
                display="flex"
                alignItems="center"
                paddingRight={1} 
                position="relative"
              >
                Name
                <Box
                  sx={{
                    height: 'auto',
                    borderRight: '1px solid #000',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    paddingLeft: 1, 
                  }}
                />
              </Box>
            </TableCell>
            <TableCell>
              <Box
                display="flex"
                alignItems="center"
                paddingRight={1}
                position="relative"
              >
                Subject
                <Box
                  sx={{
                    height: 'auto',
                    borderRight: '1px solid #000',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    paddingLeft: 1, 
                  }}
                />
              </Box>
            </TableCell>
            <TableCell>
              <Box
                display="flex"
                alignItems="center"
                paddingRight={1} 
                position="relative"
              >
              Marks
                <Box
                  sx={{
                    height: 'auto',
                    borderRight: '1px solid #000',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    paddingLeft: 1,
                  }}
                />
              </Box>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>

        </TableHead>
        <TableBody >
          {students.map((student,index) => (
            <TableRow key={student._id}>
        
        <TableCell sx={{ width: '20%' }}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{bgcolor:'skyblue'}} >    {student.name.slice(0,1)}</Avatar>
        
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {student.name}
                </Typography>
              </Box>
            </TableCell>
              <TableCell sx={{width:'50%'}}>{student.subject}</TableCell>
              <TableCell>{student.marks}</TableCell>
              <TableCell>
    
                 
  <IconButton onClick={()=>handleMouseEnter(index)}>
                  <ExpandCircleDown />

               
  </IconButton>
  <Box
        sx={{
          display: hoverIndex === index ? 'flex' : 'none',
          flexDirection: 'column',
          position: 'absolute',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
          padding: '8px',
          zIndex: 1,
        }}
     
      >
        <Box     sx={{ 
          cursor: 'pointer', 
        }}
         onClick={() => handleEdit(student)}>

        <Typography  >Edit</Typography>
        </Box>
        <Box 
           sx={{ 
            cursor: 'pointer', 
         
          }}
        onClick={() => handleDelete(student._id)}>

        <Typography >Delete</Typography>
        </Box>
      </Box>
            
          
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
            variant="contained"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              marginTop:2,
              width:'10%',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            
            onClick={() => setDailog(true)}
          >
            Add
            </Button>
            </Box>
      <AddStudentDialog open={dailog} onClose={() => {
        fetchStudents()
        setStudentView({})
        setDailog(false);
      }} data={studentView} />
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
      </Box>
  );
};

export default TeacherPortal;
