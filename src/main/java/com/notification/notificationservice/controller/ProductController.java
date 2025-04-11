package com.notification.notificationservice.controller;

import com.notification.notificationservice.entity.Product;
import com.notification.notificationservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestParam String name,
                                              @RequestParam String description,
                                              @RequestParam BigDecimal price,
                                              @RequestParam Integer stockQuantity) {
        Product newProduct = new Product();
        newProduct.setName(name);
        newProduct.setDescription(description);
        newProduct.setPrice(price);
        newProduct.setStockQuantity(stockQuantity);
        newProduct.setCreatedAt(LocalDateTime.now());
        newProduct.setUpdatedAt(LocalDateTime.now());

        Product savedProduct = productService.saveProduct(newProduct);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }
}
