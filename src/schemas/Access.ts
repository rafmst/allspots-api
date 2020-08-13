import { Schema, model, Document } from 'mongoose'

interface AccessInterface extends Document {
  title: string
  slug: string
}

const AccessSchema = new Schema(
  {
    title: String,
    slug: String
  },
  {
    timestamps: true
  }
)

export default model<AccessInterface>('Access', AccessSchema)
