import express from 'express';
import { getResources } from '../controllers/resources.controller.js';

const router = express.Router();

router.post('/', getResources);

export default router;
