import express from 'express';
import { generateTreeData } from '../controllers/treeData.controller.js';

const router = express.Router();

router.post('/', generateTreeData);

export default router;
