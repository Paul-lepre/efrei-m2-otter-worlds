import Character from '../../models/character.model'

export default function putCharacterStat (req, res) {
  Character.updateStats(parseInt(req.params.id), req.body)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log('HERE !')
      res.status(400).json(err.message)
      throw err
    })
}
