import React, { useState, useEffect } from 'react';
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
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, productId: null });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteClick = (productId) => {
    setDeleteDialog({ open: true, productId });
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.deleteProduct(deleteDialog.productId);
      setProducts(products.filter(product => product.id !== deleteDialog.productId));
      setAlert({
        open: true,
        type: 'success',
        message: 'Product deleted successfully'
      });
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: 'Failed to delete product. Please try again.'
      });
    } finally {
      setDeleteDialog({ open: false, productId: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, productId: null });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
          <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
          <Typography variant="h6" color="text.secondary">
            Loading products...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" variant="filled" sx={{ my: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container sx={{ py: 8 }}>
        <Card elevation={2} sx={{ maxWidth: 600, mx: 'auto', borderRadius: 3 }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <InventoryIcon sx={{ fontSize: 72, color: 'primary.main', mb: 2, opacity: 0.8 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Be the first to add a product!
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                component={RouterLink}
                to="/products/add"
                startIcon={<AddCircleIcon />}
                size="large"
                sx={{ px: 3 }}
              >
                Add Product
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
          Products
        </Typography>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="contained"
            component={RouterLink}
            to="/products/add"
            startIcon={<AddCircleIcon />}
            size="large"
          >
            Add New Product
          </Button>
        </motion.div>
      </Box>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <motion.div variants={itemVariants}>
                <Card 
                  elevation={1} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 140,
                      bgcolor: `hsl(${product.id * 40}, 70%, 95%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <InventoryIcon sx={{ fontSize: 64, color: `hsl(${product.id * 40}, 60%, 45%)` }} />
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                      {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AttachMoneyIcon sx={{ color: 'success.main', mr: 0.5 }} />
                      <Typography variant="h6" color="success.main" sx={{ fontWeight: 600 }}>
                        {Number(product.price).toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Chip 
                        label={`In Stock: ${product.stockQuantity}`} 
                        color={product.stockQuantity > 10 ? 'success' : product.stockQuantity > 0 ? 'warning' : 'error'}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ p: 2, pt: 1.5, pb: 1.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      Added on: {new Date(product.createdAt).toLocaleDateString()}
                    </Typography>
                    <IconButton 
                      onClick={() => handleDeleteClick(product.id)}
                      color="error"
                      sx={{ 
                        '&:hover': {
                          backgroundColor: 'rgba(211, 47, 47, 0.04)'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
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

export default ProductList; 