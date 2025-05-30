import express from 'express';
import {
  createConnection,
  getConnections,
} from '../controllers/connectionController.js';

const router = express.Router();

router.post('/', createConnection);
router.get('/', getConnections);

export default router;
