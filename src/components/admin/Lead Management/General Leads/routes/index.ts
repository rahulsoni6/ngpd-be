import express from 'express';
import { createGeneralLead, deleteGeneralLeads, getAllGeneralLeads, getGeneralLeadsById, updateGeneralLeads } from '../controller';

const router = express.Router();

router.post('/create', createGeneralLead);
router.get('/get', getAllGeneralLeads);
router.get('/get/:id', getGeneralLeadsById);
router.put('/update/:id', updateGeneralLeads);
router.delete('/delete/:id', deleteGeneralLeads)


export default router;