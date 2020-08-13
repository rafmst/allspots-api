import { Context, Next } from 'Koa'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../schemas/User'

class AuthController {
  /**
   * Register a user
   * @param req
   * @param res
   */
  public async register(ctx: Context, next: Next): Promise<void> {
    const saltRounds: number = parseInt(process.env.SALT_ROUNDS!)
    const hash = await bcrypt.hash(ctx.request.body.password, saltRounds)

    ctx.request.body.password = hash
    ctx.request.body.role = '5eab33527e5613eb54f69df3'

    await User.create(ctx.request.body)
    const user = await User.findOne({ email: ctx.request.body.email }).select('name email role')

    ctx.body = { content: { user } }

    await next()
  }

  /**
   * Authenticate user
   * @param req
   * @param res
   */
  public async authenticate(ctx: Context, next: Next): Promise<void> {
    const user = await User.findOne({ email: ctx.request.body.email })
    const secretKey = process.env.SECRET!

    if (user !== null) {
      const result = await bcrypt.compare(ctx.request.body.password, user.password)

      if (result) {
        const userPublicData = await User.findOne({ email: ctx.request.body.email }).select('name email role')
        const token = jwt.sign({ user: userPublicData }, secretKey)

        ctx.body = { content: { user: userPublicData, token } }
        await next()
        return
      }
    }

    ctx.body = {
      error: {
        status: true,
        message: 'user_not_found'
      },
      content: null
    }

    await next()
    return
  }
}

export default new AuthController()
