import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
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
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    await db.collection('contacts').insertOne({ name, email, message, date: new Date() });
    console.log('Contact saved:', { name, email, message });
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
});

// Optional: catch-all error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
