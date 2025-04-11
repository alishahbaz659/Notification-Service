package com.notification.notificationservice.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationPayload {
    private Long userId;
    private String recipientEmail;
    private String subject;
    private String message;
    private String type; // e.g., "EMAIL", "SMS"
}
