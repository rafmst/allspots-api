import { Context, Next } from 'koa'

class MainController {
  /**
   * Redirect to the documentation
   * @param ctx Context
   * @param next Next
   */
  public async documentation(ctx: Context, next: Next) {
    ctx.redirect('https://rafmst.gitbook.io/allspots/')
  }
}

export default new MainController()
