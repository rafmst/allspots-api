import { Schema, model, Document } from 'mongoose'

interface SkillInterface extends Document {
  title: string
  slug: string
}

const SkillSchema = new Schema(
  {
    title: String,
    slug: String
  },
  {
    timestamps: true
  }
)

export default model<SkillInterface>('Skill', SkillSchema)
