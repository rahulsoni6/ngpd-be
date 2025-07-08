import mongoose, { Document, Schema } from 'mongoose'

export enum PressReleaseCategory {
  Market = 'market',
  Latest = 'latest',
}

export interface IPressRelease extends Document {
  title: string
  tags: string[]
  content: string
  metaTitle: string
  metaDescription: string
  featuredImage: string
  documents: string[]
  category: PressReleaseCategory
}

const PressReleaseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    tags: { type: [String], default: [] },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: Object.values(PressReleaseCategory),
      // default: PressReleaseCategory.Latest,
    },
    isFeaturedArticle: { type: Boolean, default: false },
    image: { type: String },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IPressRelease>('PressRelease', PressReleaseSchema)
