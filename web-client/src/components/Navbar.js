import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon fontSize="small" /> },
  { name: 'Products', path: '/products', icon: <InventoryIcon fontSize="small" /> },
  { name: 'Add Product', path: '/products/add', icon: <AddCircleIcon fontSize="small" /> },
];

const Navbar = () => {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Animation variants
  const navItemVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ background: '#4f46e5' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
          >
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 3,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
                alignItems: 'center',
              }}
            >
              <NotificationsIcon sx={{ mr: 1 }} />
              Notification Service
            </Typography>
          </motion.div>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                  selected={location.pathname === page.path}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {page.icon}
                    <Typography ml={1}>{page.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
              <MenuItem 
                onClick={handleCloseNavMenu}
                component={RouterLink}
                to="/register"
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonAddIcon fontSize="small" />
                  <Typography ml={1}>Register</Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              alignItems: 'center',
            }}
          >
            <NotificationsIcon sx={{ mr: 1 }} />
            Notification Service
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <motion.div key={page.name} whileHover="hover" variants={navItemVariants}>
                <Button
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ 
                    my: 2, 
                    mx: 1,
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center',
                    borderBottom: location.pathname === page.path ? '2px solid white' : 'none',
                    borderRadius: 0,
                    fontWeight: location.pathname === page.path ? 700 : 400,
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                    }
                  }}
                  startIcon={page.icon}
                >
                  {page.name}
                </Button>
              </motion.div>
            ))}
          </Box>
          
          {/* Register Button (Desktop) */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                component={RouterLink}
                to="/register"
                startIcon={<PersonAddIcon />}
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                  }
                }}
              >
                Register
              </Button>
            </motion.div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 