# Notification Service Application

A modern notification system built with Spring Boot, React, and Apache Kafka that handles user management, product management, and real-time notifications.

<div align="center">
  
## 📺 Demo Video
[![Notification Service Demo](https://img.youtube.com/vi/1_U_G_qlclA/0.jpg)](https://youtu.be/1_U_G_qlclA?si=xvVdyd1vkubYBR8N)
  
**▶️ Click the image above to watch the demo video**

</div>

## Features

- **User Management**
  - User registration with email
  - Unique username and email validation

- **Product Management**
  - Add/delete products with details
  - View products in responsive grid
  - Real-time updates

- **Notification System**
  - Real-time notifications using Kafka
  - Email notifications via Spring Mail
  - Event-driven architecture

## Tech Stack

**Backend:** Java 17, Spring Boot 3.x, Apache Kafka, MySQL, Maven

**Frontend:** React 18, Material-UI, Formik, Framer Motion

## Quick Start

1. **Clone & Setup**
```bash
git clone <repository-url>
cd notification-service
```

2. **Database & Kafka**
```bash
docker-compose up -d
```

3. **Run Backend**
```bash
./mvnw spring-boot:run
```

4. **Run Frontend**
```bash
cd web-client
npm install
npm start
```

Access at: http://localhost:3000

## API Endpoints

- `POST /api/users/register` - Register user
- `GET /api/products` - List products
- `POST /api/products/add` - Add product
- `DELETE /api/products/{id}` - Delete product

## License

Apache License 2.0 - see [LICENSE](LICENSE) file
