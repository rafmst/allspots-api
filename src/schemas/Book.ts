import { Schema, model, Document } from 'mongoose'

interface BookInterface extends Document {
    title: string
    author: string
    authorInitials(): string
}

const BookSchema = new Schema(
    {
        title: String,
        author: String
    },
    {
        timestamps: true
    }
)

/**
 * Return author initials
 * ex: John Doe returns JD
 */
BookSchema.methods.authorInitials = function(): string {
    const names = this.author.split(' ')
    return names[0][0] + names[names.length - 1][0]
}

export default model<BookInterface>('Book', BookSchema)
