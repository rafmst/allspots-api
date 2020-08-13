import { Context, Next } from 'koa'
import Access from '../schemas/Access'
import Category from '../schemas/Category'
import Size from '../schemas/Size'
import Skill from '../schemas/Skill'

class FiltersController {
  /**
   * Filters list
   * @param ctx Context
   * @param next Next
   */
  public async index(ctx: Context, next: Next): Promise<void> {
    let accesses, categories, sizes, skills
    await Promise.allSettled([
      Access.find()
        .select('title slug')
        .then((r) => (accesses = r)),
      Category.find()
        .select('title slug')
        .then((r) => (categories = r)),
      Size.find()
        .select('title slug')
        .then((r) => (sizes = r)),
      Skill.find()
        .select('title slug')
        .then((r) => (skills = r)),
    ])

    ctx.body = { content: { accesses, categories, sizes, skills } }

    await next()
  }
}

export default new FiltersController()
