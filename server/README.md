# Portfolio Backend API

This is the backend server for the portfolio website that handles contact form submissions and AI chatbot integration.

## Features

- Contact form API with MongoDB storage
- Groq Cloud AI chatbot integration
- Health check endpoint
- Production-ready error handling

## Deployment on Render

This server is configured for deployment on Render with the following settings:

### Environment Variables Required:
- `MONGO_URI` - MongoDB connection string
- `GROQ_API_KEY` - Groq Cloud API key

### Render Configuration:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: Node.js
- **Port**: Automatically assigned by Render (via `process.env.PORT`)

### Health Check
The server includes a health check endpoint at `/health` that returns status information.

### CORS Configuration
The server is configured to allow requests from:
- Local development origins
- Vercel deployment origins
- Render deployment origins

## API Endpoints

- `GET /` - Main API status endpoint
- `GET /health` - Health check endpoint
- `POST /api/contact` - Contact form submission
- `POST /api/chat` - AI chatbot endpoint

## Architecture

- Node.js with Express.js
- MongoDB for contact form data storage
- Groq Cloud API for AI responses
- CORS configured for production deployment