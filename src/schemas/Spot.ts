import { Schema, model, Document } from 'mongoose'

interface SpotInterface extends Document {
  name: string
  slug: string
  description: string
  lat: string
  lon: string
  country: string
  city: string
  image: string
  category: string
  access: string
  size: string
  skill: string
}

const SpotSchema = new Schema(
  {
    name: String,
    slug: String,
    description: String,
    lat: String,
    lon: String,
    country: String,
    city: String,
    image: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    access: {
      type: Schema.Types.ObjectId,
      ref: 'Access',
      required: true
    },
    size: {
      type: Schema.Types.ObjectId,
      ref: 'Size',
      required: true
    },
    skill: {
      type: Schema.Types.ObjectId,
      ref: 'Skill',
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model<SpotInterface>('Spot', SpotSchema)
