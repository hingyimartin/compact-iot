import express from 'express';
import { createConnection } from '../controllers/connectionController.js';

const router = express.Router();

router.post('/', createConnection);

export default router;
