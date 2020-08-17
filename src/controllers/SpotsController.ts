import { Context, Next } from 'koa'
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

    ctx.body = { content: spots }
    await next()
  }

  public async add(ctx: Context, next: Next): Promise<void> {
    // Example on how to add spots
    await Spot.remove({})
    const spots = await Spot.create([
      {
        name: 'Fanakulturhus',
        slug: 'fanakulturhus',
        description: 'Small spot with some challenges by the side of the cultur house',
        lat: '60.3167797',
        lon: '5.3543737',
        country: 'Norway',
        city: 'Bergen',
        image:
          'https://scontent.fosl3-1.fna.fbcdn.net/v/t31.0-8/10714256_734294609971593_8608658782052307844_o.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=Ii8TFmB-Ss4AX87fl-L&_nc_ht=scontent.fosl3-1.fna&oh=40e00fc2555938fbc014d165ebc0d583&oe=5F4644C4',
        category: '5f0f540dee1b9b1a8c1fd396',
        access: '5f0f540dee1b9b1a8c1fd3a2',
        size: '5f0f540dee1b9b1a8c1fd39f',
        skill: '5f0f540dee1b9b1a8c1fd39b',
      },
      {
        name: 'Slettebakken Kirke',
        slug: 'slettebakken-slug',
        description: 'One of the best spots in the Bergen area',
        lat: '60.35261',
        lon: '5.3566798',
        country: 'Norway',
        city: 'Bergen',
        image: 'https://www.grind.no/sites/default/files/bilder/sted/304/343_slettebakken_kirke.png',
        category: '5f0f540dee1b9b1a8c1fd396',
        access: '5f0f540dee1b9b1a8c1fd3a2',
        size: '5f0f540dee1b9b1a8c1fd39e',
        skill: '5f0f540dee1b9b1a8c1fd39b',
      },
      {
        name: 'Pyramid',
        slug: 'pyramid',
        description: 'Kids playground at Ytrebygda kultursenter',
        lat: '60.3005939',
        lon: '5.2842134',
        country: 'Norway',
        city: 'Bergen',
        image: 'https://www.markhusbygg.no/wp-content/uploads/2016/10/Skranevatn02.jpg',
        category: '5f0f540dee1b9b1a8c1fd397',
        access: '5f0f540dee1b9b1a8c1fd3a2',
        size: '5f0f540dee1b9b1a8c1fd39e',
        skill: '5f0f540dee1b9b1a8c1fd39a',
      },
      {
        name: 'Fysak Melkplassen',
        slug: 'fysak-melkeplassen',
        description: 'Free parkour gym',
        lat: '60.377620',
        lon: '5.304046',
        country: 'Norway',
        city: 'Melkeplassen, Bergen',
        image: 'http://fysakbergen.no/wp-content/uploads/2019/02/Parkourrail_web.jpg',
        category: '5f21e16afb79cba17497c8fe',
        access: '5f0f540dee1b9b1a8c1fd3a2',
        size: '5f0f540dee1b9b1a8c1fd39f',
        skill: '5f0f540dee1b9b1a8c1fd39a',
      },
    ])

    ctx.body = { content: spots }

    await next()
  }
}

export default new SpotsController()
