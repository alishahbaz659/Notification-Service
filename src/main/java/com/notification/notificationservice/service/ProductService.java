package com.notification.notificationservice.service;

import com.notification.notificationservice.entity.Product;
import com.notification.notificationservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
