import mongoose, { Document, Schema } from 'mongoose';

export interface IPressRelease extends Document {
  title: string;
  tags: string[];
  content: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  documents: string[]; 
}

const PressReleaseSchema: Schema = new Schema({
  title: { type: String, required: true },
  tags: { type: [String], default: [] },
  content: { type: String, required: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  featuredImage: { type: String },
  documents: { type: [String], default: [] }, 
}, {
  timestamps: true, 
});

export default mongoose.model<IPressRelease>('PressRelease', PressReleaseSchema);
