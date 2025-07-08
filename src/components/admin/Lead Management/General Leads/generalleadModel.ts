import mongoose, {Schema, Document} from "mongoose";

export enum GLSubject{
    Partnership = 'Partnership',
    DevInquiry = 'DevInquiry',
    Validator = 'Validator',
    Other = 'Other',
}

export enum GLStatus{
    New = 'New',
    Contacted = 'Contacted',
    InProgress = 'In Progress',
    Closed = 'Closed',
}

export interface GLDocument extends Document{
    name: string;
    email: string;
    subject: GLSubject;
    message: string;
    status?: GLStatus;
}

const GeneralLeadSchema: Schema = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    subject: {
        type: String,
        enum: Object.values(GLSubject),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(GLStatus),
        default: GLStatus.New,
    },
    message: {type: String, required: true, trim: true},
},{
    timestamps: true,
})

export default mongoose.model<GLDocument>('GeneralLead', GeneralLeadSchema);