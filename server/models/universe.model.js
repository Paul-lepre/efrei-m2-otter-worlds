import { baseAPI } from '../routes/routes'
const hal = require('hal')

const _universes = [
  {
    id: 0,
    userId: 1,
    name: 'DnD',
    description: 'this is the typical fantasy universe',
    bIsPublic: true
  },
  {
    id: 1,
    userId: 3,
    name: 'Warhammer',
    description: 'this is the typical heretic universe',
    bIsPublic: true
  }
]

export default class Universe {
  /** @type {Number} */
  id
  /** @type {String} */
  name
  /** @type {String} */
  description
  /** @type {Boolean} */
  bIsPublic
  /** @type {String} */
  userId

  /**
   * @param {Universe} universe
   */
  constructor (universe) {
    this.id = universe.id
    this.name = universe.name
    this.description = universe.description
    this.bIsPublic = universe.bIsPublic
    this.userId = universe.userId
  }

  asResource (req) {
    const resource = hal.Resource(
      {
        id: this.id,
        name: this.name,
        description: this.description,
        bIsPublic: this.bIsPublic
      }, `${baseAPI(req)}universes/${this.id}`)

    resource.link('user', `${baseAPI(req)}users/${this.userId}`)

    resource.link('characters', `${baseAPI(req)}universes/${this.id}/characters`)
    resource.link('maps', `${baseAPI(req)}universes/${this.id}/maps`)
    resource.link('templateCategories', `${baseAPI(req)}universes/${this.id}/templateCategories`)
    resource.link('timelines', `${baseAPI(req)}universes/${this.id}/timelines`)
    resource.link('topics', `${baseAPI(req)}universes/${this.id}/topics`)

    return resource
  }

  /**
   * @param universes {Universe[]}
   */
  static asResourceList (req, universes) {
    const resourceUniverses = []
    for (const universe of universes) {
      const _universe = new Universe(universe)
      resourceUniverses.push(_universe.asResource(req).toJSON())
    }

    const resource = hal.Resource({ universes: resourceUniverses }, `${baseAPI(req)}universes`)

    return resource
  }

  /**
   * @returns {Promise<Universe[]>}
   */
  static async getAll () {
    return await new Promise((resolve, reject) => {
      resolve(_universes)
    })
  }

  /**
   * @param {Number} id
   * @returns {Promise<Universe>}
   */
  static async get (id) {
    return await new Promise((resolve, reject) => {
      const universe = _universes.find(_ => _.id === id)

      if (universe === undefined) { return reject(new Error(`Universe ${id} don't exist !`)) }
      resolve(new Universe(universe))
    })
  }
}
