import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import api from '../services/api';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

const UserRegistration = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await api.registerUser(values);
      setAlert({
        open: true,
        type: 'success',
        message: 'Registration successful! You will now receive notifications for new products.'
      });
      resetForm();
      setTimeout(() => navigate('/products'), 2000);
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: error.response?.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

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
        <motion.div variants={itemVariants}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                color: 'primary.main'
              }}
            >
              User Registration
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Register to receive notifications about new products
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card 
            elevation={2} 
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
                  <Form>
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                        InputProps={{
                          startAdornment: <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          startAdornment: <LockIcon sx={{ mr: 1, color: 'primary.main' }} />
                        }}
                      />
                    </Box>

                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      startIcon={<PersonAddIcon />}
                      sx={{ 
                        py: 1.5,
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                          color: 'white'
                        }
                      }}
                    >
                      {isSubmitting ? 'Registering...' : 'Register'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </motion.div>

        <Box 
          sx={{ 
            mt: 4, 
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
 
        </Box>
      </motion.div>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.type} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserRegistration; 