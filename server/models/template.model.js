import { baseAPI } from '../routes/routes'
import mariadbStore from '../mariadb-store'
const hal = require('hal')

export default class Template {
  /** @type {Number} */
  idTemplate
  /** @type {String} */
  string
  /** @type {Boolean} */
  bBoolean
  /** @type {Number} */
  idOther

  /**
   * @param {Template} template
   */
  constructor (template) {
    this.idTemplate = template.idTemplate
    this.string = template.string
    this.bBoolean = template.bBoolean
    this.idOther = template.idOther
  }

  asResource (req) {
    // The data from the object
    const resource = hal.Resource(
      {
        id: this.idTemplate,
        string: this.string,
        bBoolean: !!this.bBoolean
      },
      `${baseAPI(req)}templates/${this.idTemplate}`)

    // the links one to one and many to one
    resource.link('other',
      `${baseAPI(req)}others/${this.idOther}`)

    // the links one to many
    resource.link('otherOthers',
      `${baseAPI(req)}templates/${this.idTemplate}/otherOthers`)

    return resource
  }

  /**
   * @param templates {Template[]}
   */
  static asResourceList (req, templates) {
    const resourceTemplates = []
    for (const template of templates) {
      const _template = new Template(template)
      resourceTemplates.push(_template.asResource(req).toJSON())
    }

    const resource = hal.Resource({ templates: resourceTemplates }, `${baseAPI(req)}templates`)

    return resource
  }

  /**
   * @returns {Promise<Template[]>}
   */
  static async getAll () {
    return await mariadbStore.client.query('SELECT * FROM template')
  }

  /**
   * @param {Number} id
   * @returns {Promise<Template>}
   */
  static async get (id) {
    const conn = (await mariadbStore.client.query(`SELECT * FROM template WHERE idTemplate = ${id}`))[0]
    if (!conn) {
      throw new Error(`Template ${id} don't exist !`)
    }

    return new Template(conn)
  }
}
