import Universe from '../../../models/universe.model'

export default function postUniverse (req, res) {
  Universe.add(new Universe(req.body))
    .then((insertedId) => {
      res.status(201).json(insertedId)
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.code)
      const jsonErr = { code: err.code }
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        jsonErr.message = 'Error while creating the new universe.\nNo existing user for this id.\nPlease verify that your data is valid !'
      } else if (err.code === 'ER_PARAMETER_UNDEFINED') {
        jsonErr.message = 'Error while creating the new universe.\nMissing a parameter.\nPlease verify that your data is valid !'
      } else if (err.code === 'ER_DUP_ENTRY') {
        jsonErr.message = 'Error while creating the new universe.\nDuplicate of a unique row.\nPlease verify that your data is valid !'
      }
      res.status(400).json(jsonErr)
      throw err
    })
}
