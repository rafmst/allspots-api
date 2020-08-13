import { Schema, model, Document } from 'mongoose'

interface CategoryInterface extends Document {
  title: string
  slug: string
}

const CategorySchema = new Schema(
  {
    title: String,
    slug: String
  },
  {
    timestamps: true
  }
)

export default model<CategoryInterface>('Category', CategorySchema)
