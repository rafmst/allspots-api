import { Context, Next } from 'koa'
import slugify from 'slugify'
import Spot from '../schemas/Spot'

// Interfaces
interface FiltersObject {
  city?: Object
  country?: Object
  access?: Object
  category?: Object
  skill?: Object
  size?: Object
}

// Class
class SpotsController {
  /**
   * List of all spots
   * @param ctx Context
   * @param next Next
   */
  public async list(ctx: Context, next: Next): Promise<void> {
    const { query } = ctx.request

    let filtersObject: FiltersObject = {}

    // Location filter
    if (typeof query.location !== 'undefined') {
      const location = query.location.split(',')
      filtersObject.city = { $eq: location[0] }
      filtersObject.country = { $eq: location[1] }
    }

    // Access filter
    if (typeof query.access !== 'undefined') {
      filtersObject.access = { $eq: query.access }
    }

    // Categories filter
    if (typeof query.categories !== 'undefined') {
      filtersObject.category = { $in: query.categories.split(',') }
    }

    // Sizes filter
    if (typeof query.sizes !== 'undefined') {
      filtersObject.size = { $in: query.sizes.split(',') }
    }

    // Skills filter
    if (typeof query.skills !== 'undefined') {
      filtersObject.skill = { $in: query.skills.split(',') }
    }

    const spots = await Spot.find(filtersObject)
      .select('name slug country city image')
      .populate('access', 'title')
      .populate('skill', 'title')
      .populate('size', 'title')

    ctx.body = { content: spots }
    await next()
  }

  /**
   * Add new spot
   * @param ctx - Context of the application
   * @param next - Next process in cainh
   */
  public async add(ctx: Context, next: Next): Promise<void> {
    const mandatoryFields = [
      'name',
      'description',
      'lat',
      'lon',
      'city',
      'country',
      'image',
      'category',
      'access',
      'skill',
      'size',
    ]

    let emptyOrUndefinedFields = false
    mandatoryFields.map((field) => {
      if (typeof ctx.request.body[field] === 'undefined' || !ctx.request.body[field].length) {
        emptyOrUndefinedFields = true
      }
    })

    if (emptyOrUndefinedFields) {
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

    const { body } = ctx.request
    const createdSpot = await Spot.create({
      name: body.name,
      slug: slugify(body.name.toLowerCase()),
      description: body.description,
      lat: body.lat,
      lon: body.lon,
      country: body.country,
      city: body.city,
      image: body.image,
      category: body.category,
      access: body.access,
      size: body.size,
      skill: body.skill,
    })

    const spot = await Spot.findOne({ _id: createdSpot._id })
      .select('name slug country city image')
      .populate('access', 'title')
      .populate('skill', 'title')
      .populate('size', 'title')

    ctx.body = { content: { spot } }

    await next()
  }
}

export default new SpotsController()
