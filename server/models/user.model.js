import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class User {
  /** @type {Number} */
  idUser
  /** @type {String} */
  username

  /**
   * @param {User} user
   */
  constructor (user) {
    this.idUser = user.idUser
    this.username = user.username
  }

  asResource (req) {
    const resource = hal.Resource(
      {
        id: this.idUser,
        username: this.username
      },
      `${baseAPI(req)}users/${this.idUser}`)

    resource.link('universes',
      `${baseAPI(req)}users/${this.idUser}/universes`)

    return resource
  }

  /**
   * @param users {User[]}
   */
  static asResourceList (req, users) {
    const resourceUsers = []
    for (const user of users) {
      const _user = new User(user)
      resourceUsers.push(_user.asResource(req).toJSON())
    }

    const resource = hal.Resource({ users: resourceUsers }, `${baseAPI(req)}users`)

    return resource
  }

  /**
   * @returns {Promise<User[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM user')
  }

  /**
   * @param {Number} id
   * @returns {Promise<User>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query(`SELECT * FROM user WHERE idUser = ${id}`))[0]
    if (!conn) {
      throw new Error(`User ${id} don't exist !`)
    }

    return new User(conn)
  }
}
