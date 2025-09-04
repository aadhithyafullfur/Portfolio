# Portfolio Server - MongoDB Atlas Setup

This server connects to MongoDB Atlas to store contact form submissions and other data.

## 🚀 Quick Setup

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier is sufficient)

### 2. Get Your Connection String
1. In your Atlas dashboard, click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<database>` with your database name (e.g., `portfolioDB`)

### 3. Set Up Environment Variables
1. Create a `.env` file in the server directory
2. Add your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.abc123.mongodb.net/portfolioDB?retryWrites=true&w=majority
PORT=5000
```

### 4. Install Dependencies & Run
```bash
npm install
npm run dev
```

## 📊 Database Collections

The server creates the following collections automatically:

- **contacts**: Stores contact form submissions
  - `name`: Sender's name
  - `email`: Sender's email
  - `message`: Message content
  - `createdAt`: Timestamp
  - `ip`: Sender's IP address

## 🔧 API Endpoints

- `GET /` - Server status
- `GET /api/health` - Health check with database status
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact submissions (admin)

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Use strong passwords for your MongoDB Atlas user
- Consider setting up IP whitelist in Atlas for production
- The free tier has connection limits (500 connections)

## 🐛 Troubleshooting

### Connection Issues
- Verify your connection string format
- Check if your IP is whitelisted in Atlas
- Ensure your database user has proper permissions
- Check network connectivity

### Common Errors
- `MongoNetworkError`: Network connectivity issue
- `MongoServerSelectionError`: Atlas cluster not accessible
- `AuthenticationFailed`: Wrong username/password

## 📈 Monitoring

The server includes:
- Connection status logging
- Health check endpoint
- Graceful shutdown handling
- Error logging with emojis for easy identification

## 🔄 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | Required |
| `PORT` | Server port | 5000 |

## 🚀 Production Deployment

For production:
1. Use a paid Atlas cluster
2. Set up proper authentication
3. Configure IP whitelist
4. Use environment variables in your hosting platform
5. Set up monitoring and alerts 