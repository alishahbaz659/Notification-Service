package com.notification.notificationservice.service;

import com.notification.notificationservice.entity.Notification;
import com.notification.notificationservice.entity.Product;
import com.notification.notificationservice.entity.User;
import com.notification.notificationservice.repository.NotificationRepository;
import com.notification.notificationservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final EmailService emailService;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    private static final String NEW_PRODUCT_TOPIC = "new-product-notifications";

    public void sendNewProductNotification(Product product) {
        List<User> users = userRepository.findAll();
        String subject = "New Product Notification";
        String message = String.format("A new product '%s' has been added: %s", product.getName(), product.getDescription());

        for (User user : users) {
            NotificationPayload notificationPayload = new NotificationPayload(user.getId(), user.getEmail(), subject, message, "EMAIL");
            kafkaTemplate.send(NEW_PRODUCT_TOPIC, String.valueOf(user.getId()), notificationPayload);
            saveNotification(user, message,"KAFKA", null);
        }
    }

    @Async
    public void sendEmailAsync(String to, String subject, String text, User user) {
        emailService.sendSimpleEmail(to, subject, text);
        saveNotification(user,text,"EMAIL",user.getEmail());
    }

    private void saveNotification(User user, String message, String type, String recipient) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRecipient(recipient);
        notification.setSentAt(LocalDateTime.now());
        notification.setStatus("PENDING");
        notificationRepository.save(notification);
    }

}
