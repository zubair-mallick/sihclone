import express from 'express';
import { getCareerGuidance } from '../controllers/careerGuidance.controller.js';

const router = express.Router();

router.post('/', getCareerGuidance);

export default router;
