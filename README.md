# Notification Service Application - Development Progress

This README provides an overview of the development progress of the Notification Service application as of April 12, 2025.

## Core Functionality Implemented

So far, we have built the foundational components for managing users, products, and sending notifications asynchronously using Apache Kafka.

### 1. Data Model (Entities)

We have defined the following JPA entities to represent our data:

* **`User`**: Represents a user in the system with fields for `id`, `username`, `email`, and `password`.
* **`Product`**: Represents a product with fields for `id`, `name`, `description`, `price`, `stockQuantity`, `createdAt`, and `updatedAt`.
* **`Notification`**: Represents a notification record with fields for `id`, `user` (many-to-one relationship with `User`), `message`, `type` (e.g., "EMAIL", "KAFKA"), `recipient`, `sentAt`, and `status` (e.g., "PENDING", "SENT", "FAILED").

### 2. Data Access Layer (Repositories)

For each entity, we have created a Spring Data JPA repository interface (`UserRepository`, `ProductRepository`, `NotificationRepository`) that provides methods for basic CRUD operations and custom queries.

### 3. Service Layer

The service layer contains the business logic of our application:

* **`UserService`**: Handles user-related operations like registration and retrieval.
* **`ProductService`**: Handles product-related operations, including saving new products. Upon saving a new product, it triggers a notification.
* **`EmailService`**: A basic service for sending simple email messages using Spring Mail and configured to use MailHog for development testing.
* **`NotificationService`**: Responsible for orchestrating the sending of new product notifications. It retrieves all users and produces a `NotificationPayload` message to a Kafka topic for each user. It also saves a `Notification` record with a "PENDING" status.
* **`NotificationConsumerService`**: A Kafka consumer that listens to the `new-product-notifications` topic. It consumes `NotificationPayload` messages, retrieves the corresponding user, sends an email using `EmailService`, and updates the status of the `Notification` record in the database to "SENT".

### 4. REST API (Controllers)

We have created the following REST controllers to expose our functionalities:

* **`UserController`**: Provides endpoints for user registration (`/api/users/register` - POST) and retrieving a user by username (`/api/users/{username}` - GET).
* **`ProductController`**: Provides an endpoint for adding new products (`/api/products/add` - POST).

### 5. Asynchronous Notification Handling with Apache Kafka

We have implemented asynchronous notification sending using Apache Kafka:

* **Kafka Setup**: A single-node Kafka broker is set up using Docker Compose.
* **Kafka Integration**: The Spring Boot application uses the `spring-kafka` dependency to interact with the Kafka broker.
* **Message Production**: When a new product is added, the `NotificationService` creates `NotificationPayload` objects and sends them as messages to the `new-product-notifications` Kafka topic.
* **Message Consumption**: The `NotificationConsumerService` listens to this topic, consumes the messages, and handles the actual email sending.
* **Message Format**: Messages sent to Kafka are serialized as JSON using Spring Kafka's `JsonSerializer`.
* **Deserialization**: The `NotificationConsumerService` uses Spring Kafka's `JsonDeserializer` to deserialize the messages back into `NotificationPayload` objects. We configured the trusted packages for the deserializer in `application.properties`.

### 6. Configuration

* **`application.properties`**: Contains configurations for database connection (MySQL), MailHog, and Kafka broker details, including the bootstrap servers and trusted packages for JSON deserialization.
* **`docker-compose.yml`**: Defines the Docker configuration for running a single-node Kafka broker without Zookeeper.

## Testing

We have tested the user registration, product creation, and the asynchronous email notification process using Postman and MailHog. When a new product is added via the API, an email notification is successfully sent to all registered users via Kafka.

## Next Steps

The following are potential next steps for the development of this application:

* Implement User Preferences for notification types.
* Implement different types of notifications (e.g., order confirmations, shipping updates).
* Explore SMS notification integration.
* Add more robust error handling and logging.
* Implement API endpoints for retrieving notification history.
* Consider adding security to the API endpoints.

This README provides a snapshot of the progress made so far. The application has a basic structure for handling users, products, and asynchronous email notifications using Kafka.
