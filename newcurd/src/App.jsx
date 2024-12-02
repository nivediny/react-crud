
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Logout from './Pages/Logout';
import User from './Pages/User';
import { Box, CssBaseline, Typography } from '@mui/material';

function App() {
  return (
    
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: '20px',
            marginTop:'100px',
            marginLeft: '0px', // Adjust to match the width of your Sidebar (240px)
            transition: 'margin-left 0.3s',
          }}
        >
       
          <Routes>                                                               
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<User />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;

