import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectionRoutes from './routes/connectionRoutes.js';
import {
  initSubscribers,
  listeningForNewSubscribers,
} from './controllers/mqttController.js';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

// Routes
server.use('/connections', connectionRoutes);

// Server
server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port: ${process.env.SERVER_PORT}`);
});

// Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB successfully connected, starting server...');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Broker
import './broker.js';
initSubscribers();
listeningForNewSubscribers();
