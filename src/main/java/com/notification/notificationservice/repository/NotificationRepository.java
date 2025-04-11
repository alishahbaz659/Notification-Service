package com.notification.notificationservice.repository;

import com.notification.notificationservice.entity.Notification;
import com.notification.notificationservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUser(User user);

    List<Notification> findByType(String type);

    List<Notification> findByStatus(String status);

    Optional<Notification> findByUserAndMessageAndTypeAndRecipientAndStatus(
            User user, String message, String type, String recipient, String status
    );
}
