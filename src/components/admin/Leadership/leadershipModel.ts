import mongoose, {Schema, Document} from "mongoose";

export interface Leadership extends Document {
    name: string;
    designation: string;
    image: string;
    status: boolean;
}

const LeadershipSchema: Schema = new Schema({
    name: {type: String, required: true, trim: true},
    designation: {type: String, required: true, trim: true},
    image: {type: String, required: true, trim: true},
    status: {type: Boolean, default: true}
},
{
    timestamps: true
})

export default mongoose.model<Leadership>('Leadership',LeadershipSchema);