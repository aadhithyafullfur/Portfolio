#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 MongoDB Atlas Environment Setup');
console.log('=====================================\n');

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('📝 Please update it manually with your MongoDB Atlas connection string.\n');
} else {
  const envContent = `# MongoDB Atlas Connection String
# Replace with your actual connection string from MongoDB Atlas
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolioDB?retryWrites=true&w=majority

# Server Configuration
PORT=5000

# Instructions:
# 1. Go to MongoDB Atlas dashboard
# 2. Click "Connect" on your cluster
# 3. Choose "Connect your application"
# 4. Copy the connection string
# 5. Replace <username>, <password>, <cluster> with your actual values
# 6. Make sure to replace <database> with 'portfolioDB' or your preferred database name
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file successfully!');
  console.log('📝 Please edit the .env file and add your MongoDB Atlas connection string.\n');
}

console.log('🚀 Next steps:');
console.log('1. Edit the .env file with your MongoDB Atlas connection string');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('4. Test the connection at: http://localhost:5000/api/health\n');

console.log('📚 For detailed setup instructions, see README.md'); 