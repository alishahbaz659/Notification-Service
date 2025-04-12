# Notification Service Web Client

React-based frontend for the Notification Service application.

## Features

- User registration
- View products
- Add new products
- Responsive UI with Bootstrap

## Getting Started

### Prerequisites

- Node.js and npm
- Notification Service backend running on port 8080

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. The application will be available at `http://localhost:3000`

## Project Structure

```
web-client/
├── public/               # Static files
├── src/                  # Source files
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── App.js            # Main application component
│   └── index.js          # Application entry point
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## API Integration

The application connects to the Notification Service backend API. The API URL is configured in `src/services/api.js`. All API requests are proxied through the development server to avoid CORS issues.

## Build for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory. 