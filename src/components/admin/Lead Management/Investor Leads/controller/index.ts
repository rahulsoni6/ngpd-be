import IRLead from '../investorleadModel';
import { Request, Response } from 'express';
import { sendResponse } from '../../../../../helpers/responsehandler';

//Become an Investor

export const createInvestorLead = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {name, email, company, type, subscribe} = req.body;

    if(!name || !email || !company || !type) {
        return res.status(400).json({message: 'All fields are required'});
    } 

    const newLead = new IRLead({
        name,
        email,
        company,
        type,
        subscribe: subscribe || false
    })

    const savedLead = await newLead.save();
    return sendResponse(res, 200, true, 'Investor Lead created successfully', savedLead);

}
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}

//Get all Investor Leads

export const getAllInvestorLeads = async (req: Request, res: Response): Promise<any> =>{
    try {
        const leads = await IRLead.find().sort({createdAt: -1});
        return sendResponse(res, 200, true, 'All Investor Leads fetched successfully', leads);
    } catch (error) {
     return res.status(500).json({ success: false, message: 'Server error', error });   
    }
}

//Get Investor Lead by ID

export const getInvestorLeadsById = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {id} = req.params;
        const {status,  notes} = req.body;

        if(!id) {
            return res.status(400).json({message: 'ID is required'});
        }
        const lead = await IRLead.findById(id);
                if(!lead) {
                    return res.status(404).json({message: 'Investor Lead not found'});
                }
        lead.status = status || lead.status;
        lead.notes = notes || lead.notes;
        const updatedLead = await lead.save();
        return sendResponse(res, 200, true, 'Investor Lead fetched successfully', updatedLead);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}

// Update Investor Lead

export const updateInvestorLead = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {id} = req.params;
        const {status, notes} = req.body;
        if(!id) {
            return res.status(400).json({message: 'ID is required'});
        }
        const lead = await IRLead.findById(id);
        if(!lead) {
            return res.status(404).json({message: 'Investor Lead not found'});
        }
        lead.status = status || lead.status;
        lead.notes = notes || lead.notes;
        const updatedLead = await lead.save();
        return sendResponse(res, 200, true, 'Investor Lead updated successfully', updatedLead)
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}

//Delete Investor Lead

export const deleteInvestorLead = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({message: 'ID is required'});
        }
        const lead = await IRLead.findById(id);
        if(!lead) {
            return res.status(404).json({message: 'Investor Lead not found'});
        }
        await IRLead.findByIdAndDelete(id)
        return sendResponse(res, 200, true, 'Investor Lead deleted successfully');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}