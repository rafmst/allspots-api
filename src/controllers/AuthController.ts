import { Context, Next } from 'koa'
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
    const { password: pass, conPassword: conPass, email, name } = ctx.request.body

    // Checks if content exists
    if (typeof pass === 'undefined' || typeof conPass === 'undefined' || typeof email === 'undefined' || typeof name === 'undefined') {
      ctx.body = {
        error: {
          status: true,
          message: 'emptyFields',
        },
        content: null,
      }

      await next()
      return
    }

    // Check if user already exists
    const userExists = await User.findOne({ email }).select('name email role')
    if(userExists !== null){
      ctx.body = {
        error: {
          status: true,
          message: 'userAlreadyExists',
        },
        content: null,
      }

      await next()
      return
    }

    // Checks password size
    if (pass.length < 8) {
      ctx.body = {
        error: {
          status: true,
          message: 'passwordTooSmall',
        },
        content: null,
      }

      await next()
      return
    }

    // Checks password is equal to confirmation password
    if (pass !== conPass) {
      ctx.body = {
        error: {
          status: true,
          message: 'passwordsAreDifferent',
        },
        content: null,
      }

      await next()
      return
    }

    const saltRounds: number = parseInt(process.env.SALT_ROUNDS!)
    const hash = await bcrypt.hash(pass, saltRounds)

    ctx.request.body.password = hash
    ctx.request.body.role = '5eab33527e5613eb54f69df3'

    await User.create(ctx.request.body)
    const user = await User.findOne({ email }).select('name email role')

    ctx.body = { content: { user } }

    await next()
    return
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
        message: 'userNotFound',
      },
      content: null,
    }

    await next()
    return
  }
}

export default new AuthController()
