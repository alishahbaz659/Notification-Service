# Notification Service Application

A modern notification system built with Spring Boot, React, and Apache Kafka that handles user management, product management, and real-time notifications.

## Features

- **User Management**
  - User registration with email
  - Unique username and email validation
  - Secure password handling

- **Product Management**
  - Add new products with name, description, price, and stock quantity
  - View all products in a responsive grid layout
  - Delete products with confirmation
  - Real-time updates

- **Notification System**
  - Real-time notifications using Apache Kafka
  - Email notifications via Spring Mail
  - Asynchronous message processing
  - Event-driven architecture

<div align="center">
  
## 📺 Demo Video
[![Notification Service Demo](https://img.youtube.com/vi/1_U_G_qlclA/0.jpg)](https://youtu.be/1_U_G_qlclA?si=xvVdyd1vkubYBR8N)
  
**▶️ Click the image above to watch the demo video**

</div>

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- Spring Mail
- Apache Kafka
- MySQL Database
- Maven

### Frontend
- React 18
- Material-UI (MUI)
- Formik & Yup
- Framer Motion
- Axios

## Prerequisites

- Java 17 or higher
- Maven
- Node.js and npm
- Docker and Docker Compose
- MySQL

## Setup and Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd notification-service
```

### 2. Database Setup
```sql
CREATE DATABASE notification_db;
```

Update `src/main/resources/application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/notification_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Start Kafka
```bash
docker-compose up -d
```

### 4. Run Backend
```bash
# Build and run the Spring Boot application
./mvnw clean install
./mvnw spring-boot:run
```

### 5. Run Frontend
```bash
# Navigate to web client directory
cd web-client

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## API Endpoints

### User Management
- `POST /api/users/register` - Register new user
- `GET /api/users/{username}` - Get user details

### Product Management
- `GET /api/products` - Get all products
- `POST /api/products/add` - Add new product
- `DELETE /api/products/{id}` - Delete product

## Architecture

The application follows an event-driven architecture:

1. **Product Added**
   - Backend creates a notification event when a new product is added

2. **Kafka Producer**
   - Event is published to Kafka topic for each registered user

3. **Kafka Consumer**
   - Processes events asynchronously

4. **Email Delivery**
   - Notifications are sent via Spring Mail

## Development

### Backend Development
```bash
# Run tests
./mvnw test

# Run with specific profile
./mvnw spring-boot:run -Dspring.profiles.active=dev
```

### Frontend Development
```bash
# Run tests
cd web-client
npm test

# Build for production
npm run build
```

## Configuration

### Email Configuration
Update `application.properties` for email settings:
```properties
spring.mail.host=your-smtp-host
spring.mail.port=587
spring.mail.username=your-email
spring.mail.password=your-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

### Kafka Configuration
```properties
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.consumer.group-id=notification-group
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
