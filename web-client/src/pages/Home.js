import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
              Notification Service
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary', mb: 4, maxWidth: '800px', mx: 'auto' }}>
              A modern notification system powered by Spring Boot, React, and Apache Kafka
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="contained" 
                size="large" 
                component={RouterLink} 
                to="/register"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    color: "white"
                  }
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {/* Main Content Section - Features and Architecture Side by Side */}
        <Box sx={{ mb: 8 }}>
          <Grid 
            container 
            spacing={4} 
            sx={{ 
              display: 'flex',
              alignItems: 'stretch'
            }}
          >
            {/* Left Side: System Architecture */}
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{ 
                display: 'flex',
                alignItems: 'stretch'
              }}
            >
              <motion.div 
                variants={itemVariants}
                style={{ width: '100%' }}
              >
                <Card 
                  elevation={2} 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column', 
                    borderRadius: 3, 
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                      System Features & Architecture 
                    </Typography>
                    <Typography paragraph sx={{ mb: 3 }}>
                      This application demonstrates an event-driven architecture using Apache Kafka for
                      asynchronous message processing and decoupled communication between services.
                    </Typography>
                    
                    <Stack spacing={2}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          background: 'rgba(99, 102, 241, 0.05)',
                          border: '1px solid rgba(99, 102, 241, 0.1)'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main', mr: 2 }}>
                            <LooksOneIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Product Added</Typography>
                            <Typography variant="body2" color="text.secondary">
                              When a new product is added, the backend creates a notification event
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                      
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          background: 'rgba(99, 102, 241, 0.05)',
                          border: '1px solid rgba(99, 102, 241, 0.1)'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main', mr: 2 }}>
                            <LooksTwoIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Kafka Producer</Typography>
                            <Typography variant="body2" color="text.secondary">
                              The event is published to a Kafka topic for each registered user
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                      
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          background: 'rgba(99, 102, 241, 0.05)',
                          border: '1px solid rgba(99, 102, 241, 0.1)'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main', mr: 2 }}>
                            <Looks3Icon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Kafka Consumer</Typography>
                            <Typography variant="body2" color="text.secondary">
                              A consumer service processes these events asynchronously
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                      
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          background: 'rgba(99, 102, 241, 0.05)',
                          border: '1px solid rgba(99, 102, 241, 0.1)'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main', mr: 2 }}>
                            <Looks4Icon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Email Delivery</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Notifications are sent to users via email through Spring Mail
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            {/* Right Side: Features */}
            <Grid 
              item 
              xs={12} 
              md={6} 
              sx={{ 
                display: 'flex',
                alignItems: 'stretch'
              }}
            >
              <motion.div 
                variants={itemVariants}
                style={{ width: '100%' }}
              >
                <Card 
                  elevation={2} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3, 
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                
          
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
        
        {/* Call to Action */}
        <motion.div variants={itemVariants}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 6, 
              textAlign: 'center', 
              borderRadius: 3,
              background: 'linear-gradient(45deg, #4f46e5 0%, #6366f1 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
              Ready to see it in action?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, color: 'white' }}>
              Add a new product and watch the notification system work through Kafka
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/products/add"
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  backgroundColor: "primary.main", 
                  color: "white",
                  ':hover': {
                    backgroundColor: "primary.main"
                  }
                }}
              >
                Add Your First Product
              </Button>
            </motion.div>
          </Paper>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Home; 