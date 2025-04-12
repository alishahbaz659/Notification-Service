import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// Pages
import Home from './pages/Home';
import UserRegistration from './pages/UserRegistration';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, minHeight: 'calc(100vh - 64px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
}

export default App; 