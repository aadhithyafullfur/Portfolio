import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
  origin: ['http://localhost:3000', 'https://portfolio-aadhithyafullfur.vercel.app'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());

let db;

async function connectDB(retries = 5) {
  while (retries > 0) {
    try {
      const client = new MongoClient(MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
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
