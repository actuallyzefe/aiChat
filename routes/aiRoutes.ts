import express from 'express';
import { generateImage, chat } from '../controllers/aiController';
const router = express.Router();

router.post('/generateimage', generateImage);
router.post('/chatwithAI', chat);

export { router as aiRoutes };
