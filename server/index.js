import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT) || 5001;
const MONGO_URI = process.env.MONGO_URI;

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'https://portfolio-aadhithyafullfur.vercel.app',
    /.vercel\.app$/,
        'https://portfolio-aadhithya-r.onrender.com', // Render deployment URL
        /.onrender\.com$/  // Allow all onrender.com subdomains
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

let db;

async function connectDB(retries = 5) {
  while (retries > 0) {
    try {
      const client = new MongoClient(MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS:  45000,
        maxPoolSize: 10, // Maintain up to 10 socket connections
        // Use the following options for newer MongoDB drivers
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      db = client.db('portfolioDB');
      console.log('MongoDB Connected successfully✅');
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt failed (${retries} retries left):`, err);
      console.error('Connection string:', MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@'));
      retries--;
      if (retries === 0) {
        console.error('All connection attempts failed');
        process.exit(1);
      }
      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

connectDB();

app.get('/', (req, res) => {
  res.send('Portfolio API Running');
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  console.log('📩 Received contact form request:', req.body);
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    console.log('⚠️ Validation failed - missing fields');
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('⚠️ Validation failed - invalid email format');
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a valid email address' 
    });
  }

  // Name validation (min 2 chars)
  if (name.trim().length < 2) {
    console.log('⚠️ Validation failed - name too short');
    return res.status(400).json({ 
      success: false, 
      message: 'Name must be at least 2 characters' 
    });
  }

  // Message validation (min 10 chars)
  if (message.trim().length < 10) {
    console.log('⚠️ Validation failed - message too short');
    return res.status(400).json({ 
      success: false, 
      message: 'Message must be at least 10 characters' 
    });
  }

  try {
    // Check if database is connected
    if (!db) {
      console.error('❌ Database not connected');
      return res.status(503).json({ 
        success: false, 
        message: 'Service temporarily unavailable. Please try again later.' 
      });
    }

    // Prepare contact data
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      timestamp: new Date(),
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'] || 'Unknown'
    };

    // Save to database
    const result = await db.collection('contacts').insertOne(contactData);
    
    console.log('✅ Contact saved successfully:', {
      id: result.insertedId,
      name: contactData.name,
      email: contactData.email
    });

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!',
      messageId: result.insertedId
    });
  } catch (err) {
    console.error('❌ Error saving message:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Chatbot API endpoint with Groq
app.post('/api/chat', async (req, res) => {
  console.log('💬 Received chatbot request:', req.body);
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ 
      success: false, 
      error: 'Message is required' 
    });
  }

  try {
    console.log('💬 Processing chat request with message:', message);
    
    // Portfolio data for context
const portfolioContext = `
You are an AI assistant for Aadhithya R's portfolio website.
Answer questions about him in a professional, friendly, and confident tone.
Help recruiters, collaborators, and visitors understand his skills, projects, and personality clearly.

====================
👤 PERSONAL PROFILE
====================
- Name: Aadhithya R
- Location: Erode, Tamil Nadu, India
- Email: aadhithyaa120@gmail.com
- Education: B.Tech in Artificial Intelligence & Data Science
- College: Kongu Engineering College
- Roles: Full Stack Developer, AI/ML Engineer, Data Analyst, Software Developer
- Career Level: Fresher / Entry-level IT professional actively seeking opportunities

====================
💡 ABOUT HIM
====================
Aadhithya is a passionate and motivated technology enthusiast with a strong interest in building real-world, impactful applications using Artificial Intelligence, Machine Learning, and Full Stack Web Development. He enjoys converting complex problems into simple, scalable solutions and continuously learning new technologies.

He has hands-on experience in building end-to-end applications, from frontend UI design to backend APIs and AI model integration.

====================
🛠️ TECHNICAL SKILLS
====================
Languages:
- C, Python, Java, JavaScript, TypeScript

Frontend:
- React, HTML, CSS, Tailwind CSS, Bootstrap

Backend:
- Node.js, Express.js, Flask, Spring Boot, Django

Databases:
- MongoDB, MySQL, PostgreSQL

AI / ML:
- Machine Learning, Deep Learning
- TensorFlow, PyTorch
- Data Analysis, Model Training & Evaluation

Tools & Technologies:
- Git, GitHub, Docker, AWS
- REST APIs, Cloud Deployment
- Linux, VS Code

====================
📂 PROJECTS
====================
1. QuikCart  
   - A full-stack e-commerce platform with real-time features
   - Includes live chat, notifications, and smooth shopping experience
   - Focused on scalability and user experience

2. Traffic Prediction System  
   - Machine learning–based traffic forecasting system
   - Uses historical and real-time data for congestion prediction
   - Designed to support smart city solutions

3. FarmConnect  
   - Farmer-to-market agricultural marketplace platform
   - Connects farmers directly with buyers
   - Aims to reduce middlemen and increase farmer profit

4. Brain Tumor Detection AI  
   - Deep learning–based medical imaging system
   - Classifies MRI scans to detect brain tumors
   - Built using CNNs and transfer learning models

====================
🎯 INTERESTS & HOBBIES
====================
- Building AI-powered applications
- Full Stack Web Development
- Exploring new AI tools and frameworks
- Participating in hackathons and coding challenges
- Learning cloud and deployment technologies
- Improving UI/UX designs
- Solving real-world problems using technology
- Tech content exploration (AI, startups, software trends)

====================
🌱 STRENGTHS
====================
- Strong problem-solving skills
- Quick learner and adaptable
- Good understanding of both frontend and backend
- Ability to work independently and in teams
- Passionate about continuous improvement
- Good communication and presentation skills

====================
🎯 CAREER GOALS
====================
- To start a career as a Software Developer / AI Engineer
- To work on impactful AI-driven products
- To grow into a skilled full-stack and AI specialist
- To contribute to innovative tech solutions in real-world domains

====================
🔗 LINKS
====================
- GitHub: https://github.com/aadhithyaa
- LinkedIn: https://linkedin.com/in/aadhithya-r
- Portfolio: https://portfolio-aadhithyafullfur.vercel.app

====================
📌 RESPONSE GUIDELINES
====================
- Keep answers concise, clear, and professional
- Highlight technical strengths and project experience
- Tailor responses for recruiters, interviewers, and collaborators
- When asked about projects, explain the tech stack and problem solved
- Maintain a confident and positive tone
`;


    // Call Groq API
    console.log('📞 Calling Groq API with model:', 'llama-3.1-8b-instant');
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: portfolioContext
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      stream: false,
      stop: null
    });
    console.log('✅ Groq API response received');

    const reply = completion.choices[0].message.content;

    res.status(200).json({ 
      success: true, 
      reply: reply
    });
  } catch (err) {
    console.error('❌ Error processing chat:', err);
    console.error('Error details:', {
      message: err.message,
      status: err.status,
      code: err.code,
      type: err.type,
      stack: err.stack
    });
    
    // Handle specific Groq errors
    if (err.status === 401 || err.message.includes('Authentication')) {
      return res.status(500).json({ 
        success: false, 
        error: 'AI service authentication failed. Please check API configuration.' 
      });
    }
    
    if (err.status === 400 || err.message.includes('Bad Request')) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid request format. Please check your message content.' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: `Failed to process your message: ${err.message}` 
    });
  }
});

// Optional: catch-all error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error. Please try again later.' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown handling for Render
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
