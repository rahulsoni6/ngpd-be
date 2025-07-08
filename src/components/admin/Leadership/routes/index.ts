import express from 'express';
import { createLeadership, readLeadership, updateLeadership } from '../controller';
import { uploadImage } from '../../../../middleware/upload.middleware';

const router = express.Router();

router.post('/create', uploadImage.single('image'), createLeadership)
router.get('/read', readLeadership)
router.put('/update/:id',uploadImage.single('image'), updateLeadership)

export default router