import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import InputAdornment from '@mui/material/InputAdornment';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import api from '../services/api';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Product name is required'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  stockQuantity: Yup.number()
    .required('Stock quantity is required')
    .integer('Stock quantity must be an integer')
    .min(0, 'Stock quantity cannot be negative')
});

const AddProduct = () => {
  const [alert, setAlert] = useState({ open: false, type: '', message: '' });
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    description: '',
    price: '',
    stockQuantity: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      // Convert price and stockQuantity to numbers
      const productData = {
        ...values,
        price: parseFloat(values.price),
        stockQuantity: parseInt(values.stockQuantity, 10)
      };

      await api.addProduct(productData);
      
      setAlert({
        open: true,
        type: 'success',
        message: 'Product added successfully! Notifications will be sent to all users.'
      });
      
      resetForm();
      
      // Redirect to products list after 2 seconds
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: error.response?.data?.message || 'Failed to add product. Please try again.'
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
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
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
              Add New Product
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Create a new product and notify all users about it
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card 
            elevation={2} 
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              maxWidth: 800,
              mx: 'auto'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <Box sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="name"
                        name="name"
                        label="Product Name"
                        placeholder="Enter product name"
                        variant="outlined"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ShoppingBagIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        placeholder="Enter product description"
                        multiline
                        rows={4}
                        variant="outlined"
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DescriptionIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        placeholder="Enter product price"
                        type="number"
                        variant="outlined"
                        inputProps={{ step: "0.01" }}
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price && errors.price}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AttachMoneyIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="stockQuantity"
                        name="stockQuantity"
                        label="Stock Quantity"
                        placeholder="Enter stock quantity"
                        type="number"
                        variant="outlined"
                        error={touched.stockQuantity && Boolean(errors.stockQuantity)}
                        helperText={touched.stockQuantity && errors.stockQuantity}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <InventoryIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <CardActions sx={{ p: 0, pb: 1 }}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ width: '100%' }}
                      >
                        <Button
                          fullWidth
                          type="submit"
                          variant="contained"
                          disabled={isSubmitting}
                          startIcon={<AddIcon />}
                          sx={{ 
                            py: 1.5,
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'primary.dark',
                              color: 'white'
                            }
                          }}
                        >
                          {isSubmitting ? 'Adding Product...' : 'Add Product'}
                        </Button>
                      </motion.div>
                    </CardActions>
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

export default AddProduct; 