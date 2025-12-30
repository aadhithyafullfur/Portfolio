import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
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
    /\.vercel\.app$/
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
        ssl: true,
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true
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
You are an AI assistant for Aadhithya R's portfolio website. Answer questions about him professionally and helpfully.

Portfolio Information:
- Name: Aadhithya R
- Location: Erode, Tamil Nadu, India
- Email: aadhithyaa120@gmail.com
- Education: B.Tech in AI & Data Science from Kongu Engineering College
- Roles: Full Stack Developer, ML Engineer, Data Analyst, AI Specialist

Projects:
1. QuikCart - E-commerce platform with real-time features including live chat, notifications, and seamless shopping experience
2. Traffic Prediction System - ML-based traffic forecasting system using advanced machine learning algorithms
3. FarmConnect - Agricultural marketplace platform connecting farmers with buyers
4. Brain Tumor Detection AI - Medical imaging AI system for detecting brain tumors using deep learning

Technical Skills:
- Languages: C, Python, Java, JavaScript, TypeScript
- Frontend: React, HTML, CSS, Tailwind CSS, Bootstrap
- Backend: Node.js, Express.js, Flask
- Database: MongoDB, MySQL, PostgreSQL
- Tools & Technologies: Git, Docker, AWS, Machine Learning, Deep Learning, Data Analysis
- Frameworks: Spring Boot, Django, TensorFlow, PyTorch

Links:
- GitHub: https://github.com/aadhithyaa
- LinkedIn: https://linkedin.com/in/aadhithya-r
- Portfolio: https://portfolio-aadhithyafullfur.vercel.app

Keep responses concise, friendly, and professional. If asked about specific project details, provide relevant technical information.
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
});
