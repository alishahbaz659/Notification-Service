package com.notification.notificationservice.service;

import com.notification.notificationservice.entity.User;
import com.notification.notificationservice.repository.NotificationRepository;
import com.notification.notificationservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationConsumerService {

    private final EmailService emailService;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @KafkaListener(topics = "new-product-notifications", groupId = "notification-group")
    public void consumeNewProductNotification(NotificationPayload payload) {
        Optional<User> userOptional = userRepository.findById(payload.getUserId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            emailService.sendSimpleEmail(payload.getRecipientEmail(), payload.getSubject(), payload.getMessage());
            updateNotificationStatus(user, payload.getMessage(), "EMAIL", payload.getRecipientEmail(), "SENT");
        } else {
            System.err.println("User not found for notification payload: " + payload);
            updateNotificationStatus(null, payload.getMessage(), "EMAIL", payload.getRecipientEmail(), "FAILED");
        }
    }

    private void updateNotificationStatus(User user, String message, String type, String recipient, String status) {
        notificationRepository.findByUserAndMessageAndTypeAndRecipientAndStatus(user, message, type, recipient, "PENDING")
                .ifPresent(notification -> {
                    notification.setStatus(status);
                    notification.setSentAt(LocalDateTime.now());
                    notificationRepository.save(notification);
                });
    }
}
