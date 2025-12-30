# Portfolio Client

This is the React frontend for the portfolio website with AI chatbot integration.

## Features

- Modern React UI with animations
- AI chatbot powered by Groq Cloud
- Contact form with backend integration
- Responsive design for all devices

## Environment Variables

For local development, create a `.env` file in the root of the client directory:

```
REACT_APP_API_URL=http://localhost:5001
```

For Vercel deployment, set this environment variable in the Vercel dashboard:
- `REACT_APP_API_URL`: Points to your deployed backend (e.g., `https://portfolio-backend-xxxx.onrender.com`)

## Deployment

### Vercel Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set the root directory to `portfolio/client`
3. Add the required environment variables in the Vercel dashboard
4. Deploy!

### Build

To build the project locally:

```bash
npm run build
```

## API Integration

The client communicates with the backend server for:
- Contact form submissions (`/api/contact`)
- AI chatbot responses (`/api/chat`)

## Architecture

- Create React App
- React with functional components and hooks
- Tailwind CSS for styling
- Framer Motion for animations
- Environment-based API configuration