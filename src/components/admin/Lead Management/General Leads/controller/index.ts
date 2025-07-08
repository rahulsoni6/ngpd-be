import GLModel from '../generalleadModel';
import { Request, Response } from 'express';
import { sendResponse } from '../../../../../helpers/responsehandler';

// Create General Lead
export const createGeneralLead = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {name, email, subject, message} = req.body;
        if(!name || !email || !subject || !message) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const newLead = new GLModel({
            name,
            email,
            subject,
            message
        });
        const savedLead = await newLead.save();
        return sendResponse(res, 200, true, 'General Lead created successfully', savedLead)
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}

// Get all General Leads
export const getAllGeneralLeads = async (req: Request, res: Response): Promise<any> =>{
    try {
        const leads = await GLModel.find().sort({createdAt: -1});
        return sendResponse(res, 200, true, 'All General Leads fetched successfully', leads);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}

// Get General Lead by ID
export const getGeneralLeadsById = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({message: 'ID is required'});
        }
        const lead = await GLModel.findById(id);
        if(!lead) {
            return res.status(404).json({message: 'General Lead not found'});
        }
        return sendResponse(res, 200, true, 'General Lead fetched successfully', lead);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}

// Update General Lead
export const updateGeneralLeads = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {id} = req.params;
        const {status, subject, message} = req.body;
        if(!id) {
            return res.status(400).json({message: 'ID is required'});
        }
        const lead = await GLModel.findById(id);
        if(!lead) {
            return res.status(404).json({message: 'Investor Lead not found'});
        }
        lead.status = status || lead.status;
        lead.subject = subject || lead.subject;
        lead.message = message || lead.message;
        const updatedLead = await lead.save();
        return sendResponse(res, 200, true, 'Investor Lead updated successfully', updatedLead)
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}

// Delete General Lead
export const deleteGeneralLeads = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({message: 'ID is required'});
        }
        const lead = await GLModel.findByIdAndDelete(id);
        if(!lead) {
            return res.status(404).json({message: 'General Lead not found'});
        }
        return sendResponse(res, 200, true, 'General Lead deleted successfully', null);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}