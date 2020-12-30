import { Context, Next } from 'koa'
import Access from '../schemas/Access'
import Category from '../schemas/Category'
import Size from '../schemas/Size'
import Skill from '../schemas/Skill'
import Spot from '../schemas/Spot'

class FiltersController {
  /**
   * Filters list
   * @param ctx Context
   * @param next Next
   */
  public async list(ctx: Context, next: Next): Promise<void> {
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

  /**
   * Get a list of cities filtered by country
   * @param ctx Context
   * @param next Next
   */
  public async cities(ctx: Context, next: Next): Promise<void> {
    let spots
    await Spot.find()
        .select('city country')
        .then((r) => (spots = r))

    let countries = {}
    spots.map((spot) => {
      if(typeof countries[spot.country] === 'undefined'){
        countries[spot.country] = []
        countries[spot.country].push(spot.city)
      }else{
        if(countries[spot.country].indexOf(spot.city) < 0){
          countries[spot.country].push(spot.city)
        }
      }
    })
    
    let orderedCountries = {} 
    Object.keys(countries).sort().map((countryName) => {
      orderedCountries[countryName] = countries[countryName].sort()
    })

    ctx.body = { content: { countries: orderedCountries } }

    await next()
  }
}

export default new FiltersController()
