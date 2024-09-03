import React from 'react';
import Login from './Pages/Login';
import TeacherPortal from './Pages/TeacherPortal';
import { useToken } from './Components/Context/TokenContext';

const App = () => {
  const { token, setToken } = useToken(); 

  return token ? (
    <TeacherPortal />
  ) : (
    <Login onLoginSuccess={setToken} />
  );
};

export default App;
