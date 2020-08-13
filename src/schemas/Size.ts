import { Schema, model, Document } from 'mongoose'

interface SizeInterface extends Document {
  title: string
  slug: string
}

const SizeSchema = new Schema(
  {
    title: String,
    slug: String
  },
  {
    timestamps: true
  }
)

export default model<SizeInterface>('Size', SizeSchema)
