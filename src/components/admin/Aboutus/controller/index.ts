import {Request, Response} from 'express';
import AboutusModel from '../aboutusModel';
import { sendResponse } from '../../../../helpers/responsehandler';

//Create Aboutus

export const createAboutus = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {content} = req.body;

        const newAboutus = new AboutusModel({
            content: content
        });

        const saveAboutus = await newAboutus.save();
        return sendResponse(res, 200, true, "Saved Aboutus Successfully", saveAboutus);
    } catch (error) { 
    console.error('Error creating Aboutus:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

//Get Aboutus

export const readAboutus = async (req: Request, res: Response): Promise<any> =>{
    try {
        const aboutus = await AboutusModel.find().sort({ createdAt: -1 }); // newest first
        
         return sendResponse(res,200, true, "Fetched all aboutus",aboutus)
    } catch (error) {
        console.error('Error reading Aboutus:', error);
        return res.status(500).json({ success: false, message: 'Server Error while reading Aboutus records' });
        
    }
}

//Update Aboutus

export const updateAboutus = async (req:Request, res: Response): Promise<any> =>{
    try {
        const {content} = req.body;

        if(!content){
            return res.status(400).json({ success: false, message: 'Content is required' });
        }

        const aboutus = await AboutusModel.findOneAndUpdate({}, {content},{
            new: true, // return the updated document
            runValidators: true // validate the update against the schema
        })
        return sendResponse(res, 200, true, "Updated Aboutus Successfully", aboutus);
    } catch (error) {
        console.error('Error updating Aboutus:', error);
        return res.status(500).json({ success: false, message: 'Server Error while updating Aboutus' });
        
    }
}