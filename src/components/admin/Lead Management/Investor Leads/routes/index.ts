import express from 'express';
import { createInvestorLead, deleteInvestorLead, getAllInvestorLeads, getInvestorLeadsById, updateInvestorLead } from '../controller';

const router = express.Router()
router.post('/create', createInvestorLead)
router.get('/getall', getAllInvestorLeads)
router.get('/get/:id', getInvestorLeadsById)
router.put('/update/:id', updateInvestorLead)
router.delete('/delete/:id', deleteInvestorLead)


export default router;