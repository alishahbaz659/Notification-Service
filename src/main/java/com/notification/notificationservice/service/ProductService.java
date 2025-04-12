package com.notification.notificationservice.service;

import com.notification.notificationservice.entity.Product;
import com.notification.notificationservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final NotificationService notificationService;

    public Product saveProduct(Product product) {
        Product savedProduct = productRepository.save(product);
        notificationService.sendNewProductNotification(product);
        return savedProduct;
    }
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}
