import mongoose, {Schema, Document} from "mongoose";

export enum IRType {
  Investor = 'Investor',
  Builder = 'Builder',
  Partner = 'Partner',
}

export enum IRStatus{
    New = 'New',
    Contacted = 'Contacted',
    InProgress = 'In Progress',
    Closed = 'Closed',
}
export interface IRleadDocument extends Document{
    name: string;
    email: string;
    company: string;
    type: IRType;
    subscribe?: boolean
    status?: IRStatus
    notes?: string
}

const IRLeadSchema: Schema = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    company: {type: String, required: true, trim: true},
    type: {
        type: String,
        enum: Object.values(IRType),
        required: true,
    },
    subscribe: {type: Boolean, default: false}
    , status: {
        type: String,
        enum: Object.values(IRStatus),
        default: IRStatus.New,
    },
    notes: {type: String, trim: true, default: ''},
}, {
    timestamps: true,
})

export default mongoose.model<IRleadDocument>('IRLead', IRLeadSchema);