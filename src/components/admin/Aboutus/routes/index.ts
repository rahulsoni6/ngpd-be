import express from 'express';
import { createAboutus, readAboutus, updateAboutus } from '../controller';

const router = express.Router()

router.post('/create', createAboutus);
router.get('/read', readAboutus);
router.put('/update', updateAboutus)

export default router