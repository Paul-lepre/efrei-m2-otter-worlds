import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class User {
  /** @type {Number} */
  idUser
  /** @type {String} */
  username
  /** @type {String} */
  password

  /**
   * @param {User} user
   */
  constructor (user) {
    this.idUser = user.idUser
    this.username = user.username
    this.password = user.password
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

  /**
   * @param {User} user
   * @returns {Promise<User>}
   */
  static async add (user) {
    const sql = 'INSERT INTO user(username, password) VALUES(?,?)'
    const params = [user.username, user.password]
    const row = await mariadbStore.client.query(sql, params)

    return row.insertId || -1
  }

  /**
   * @param {User} user
   * @returns {Promise<User>}
   */
  static async suppr (user) {
    const sql = 'SELECT * FROM user WHERE idUser = ?'
    const param = [user.idUser]
    const row = await mariadbStore.client.query(sql, param)
    const result = new User(row[0])
    console.log(result)
    if (result.password === user.password) {
      console.log('ok to delete')
      console.log(user)
      return await mariadbStore.client.query('DELETE FROM user WHERE idUser = ?', [user.idUser])
    } else {
      throw new Error('wrong passeword')
    }
  }
}
