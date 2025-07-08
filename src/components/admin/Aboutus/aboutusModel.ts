import mongoose, { Schema, Document } from 'mongoose';

export interface Aboutus extends Document{
    content: string
}

const AboutusSchema: Schema = new Schema({
    content: { type: String, required: true, trim: true }
},
{
    timestamps: true
});

export default mongoose.model<Aboutus>('Aboutus', AboutusSchema);