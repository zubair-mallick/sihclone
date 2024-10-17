import express from 'express';
import { getCareerRecommendations } from '../controllers/careerRecommendation.controller.js';

const router = express.Router();

router.post('/', getCareerRecommendations);

export default router;
