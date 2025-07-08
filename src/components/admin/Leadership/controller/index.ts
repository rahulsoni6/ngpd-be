import { Request, Response } from "express";
import LeadershipModel from "../leadershipModel";
import { sendResponse } from "../../../../helpers/responsehandler";

// Extend Multer file type for S3
interface S3File extends Express.Multer.File {
    location?: string;
    key: string;
    bucket?: string;
}

//Create Leadersip

export const createLeadership = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, designation } = req.body;
        console.log("Leadership Data:", req.body);

        if (!name || !designation) {
            return sendResponse(res, 400, false, "Name and designation are required");
        }

        // Use S3 image URL if uploaded, else fallback to body
        const file = req.file as S3File | undefined;
        const imageUrl = file?.location || req.body.image;

        const newLeadership = new LeadershipModel({
            name: name,
            designation: designation,
            image: imageUrl
        })

        console.log("New Leadership Object:", newLeadership);

        const saveLeadership = await newLeadership.save()
        return sendResponse(res, 200, true, "Saved Leadership Successfully", saveLeadership)
    } catch (error) {
        console.error('Error creating Leadership:', error);
        return res.status(500).json({ success: false, message: 'Server Error while creating Leadership' });
    }
}

// Read Leadership

export const readLeadership = async (req: Request, res: Response): Promise<any> => {
    try {
        const leadership = await LeadershipModel.find().sort({ createdAt: -1 }); // newest first
        return sendResponse(res, 200, true, "Fetched all Leadership", leadership)
    } catch (error) {
        console.error("Error reading Leadership:", error);
        return res.status(500).json({ success: false, message: 'Server Error while  reading Leadership records' });
    }
}

//Update Leadership

export const updateLeadership = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name, designation, status } = req.body;

        // Use S3 image URL if uploaded, else fallback to body
        const file = req.file as S3File | undefined;
        const imageUrl = file?.location || req.body.image;

        const leadership = await LeadershipModel.findByIdAndUpdate(id, {
            name: name,
            designation: designation,
            image: imageUrl,
            status: status
        },
            {
                new: true, // return the updated document
                runValidators: true // validate the update against the schema
            })
        return sendResponse(res, 200, true, "Updated Leadership Successfully", leadership)
    } catch (error) {
        console.error('Error updating Leadership:', error);
        return res.status(500).json({ success: false, message: 'Server Error while updating Leadership' });
    }
}