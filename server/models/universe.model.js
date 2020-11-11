import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Universe {
  /** @type {Number} */
  idUniverse
  /** @type {String} */
  name
  /** @type {String} */
  description
  /** @type {Boolean} */
  bIsPublic
  /** @type {Number} */
  idUser

  /**
   * @param {Universe} universe
   */
  constructor (universe) {
    this.idUniverse = universe.idUniverse
    this.name = universe.name
    this.description = universe.description
    this.bIsPublic = !!universe.bIsPublic
    this.idUser = universe.idUser
  }

  asResource (req) {
    const resource = hal.Resource(
      {
        id: this.idUniverse,
        name: this.name,
        description: this.description,
        bIsPublic: !!this.bIsPublic
      },
      `${baseAPI(req)}universes/${this.idUniverse}`)

    resource.link('user',
      `${baseAPI(req)}users/${this.idUser}`)

    resource.link('characters',
      `${baseAPI(req)}universes/${this.idUniverse}/characters`)
    resource.link('maps',
      `${baseAPI(req)}universes/${this.idUniverse}/maps`)
    resource.link('templateCategories',
      `${baseAPI(req)}universes/${this.idUniverse}/templateCategories`)
    resource.link('timelines',
      `${baseAPI(req)}universes/${this.idUniverse}/timelines`)
    resource.link('topics',
      `${baseAPI(req)}universes/${this.idUniverse}/topics`)

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
    return await mariadbStore.client.query('SELECT * FROM universe')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Universe>}
   */
  static async get (id) {
    const rows = (await mariadbStore.client.query('SELECT * FROM universe WHERE idUniverse = ?', id))[0]
    if (!rows) {
      throw new Error(`Universe ${id} don't exist !`)
    }

    return new Universe(rows)
  }

  /**
   * @param {Universe} universe
   * @returns {Number} the id of the new inserted universe
   */
  static async add (universe) {
    const sql = `
      INSERT INTO 
        universe(name, description, bIsPublic, idUser) 
        VALUES(?, ?, ?, ?)`
    const params = [universe.name, universe.description, universe.bIsPublic, universe.idUser]

    const rows = await mariadbStore.client.query(sql, params)

    return rows.insertId || -1
  }
}
