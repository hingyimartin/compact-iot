import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import './broker.js';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Server running on port: ${process.env.SERVER_PORT || 5000}`);
});
