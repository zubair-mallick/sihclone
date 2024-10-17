// routes/mentalHealthChatbot.routes.js
import express from 'express';
import { getCareerGuidanceResponse } from '../controllers/getCareerGuidanceChatbot.controller.js';

const router = express.Router();

router.post('/', getCareerGuidanceResponse);

export default router;
