
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Get local IP
const getLocalIpAddress = () => {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
};

// CORS
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization','Cache-Control', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'DeVere Care API Server',
    status: 'running',
    endpoints: {
      users: '/api/users',
      login: '/api/login',
      test: '/api/test'
    }
  });
});

// API Routes - NO /* here
app.use("/api", require("./routes/userRoutes"));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString()
  });
});

// 404 handler - NO /* here
app.use((req, res) => {
  res.status(404).json({ 
    error: `Route not found: ${req.originalUrl}`,
    message: 'Available endpoints: /api/users, /api/login, /api/test'
  });
});

const PORT = process.env.PORT || 5000;
const LOCAL_IP = getLocalIpAddress();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📍 Network: http://${LOCAL_IP}:${PORT}`);
  console.log(`📍 Test: http://localhost:${PORT}/api/test\n`);
});
