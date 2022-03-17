import { dbConnect, dbPrefix } from '../../../../../../../libs/dbClient'
import { ref, child, get, update } from 'firebase/database'
import { ulid } from 'ulid'
import schemaValidator from '../../../../../../../utils/schemaValidator'
import { AddCardSchema } from '../../../../../../../schema/addCard.schema'

const handlers = {
  post: addCard
}

export default async function handler (req, res) {
  let database

  try {
    database = await dbConnect()
  } catch (err) {
    console.error(err)
    res.statusCode = 400
    res.end()
  }

  const { method } = req
  const handler = handlers[method.toLowerCase()]

  if (handler) return handler(req, res, database, dbPrefix)
  else {
    res.setHeader('Allow', ['POST'])
    res.status(405)
    res.end(`Method ${method} Not Allowed`)
  }
}

async function addCard (req, res, database, dbPrefix) {
  const { id, columnId } = req.query
  const currentColumn = await get(child(ref(database), `${dbPrefix}/boards/${id}/columns/${columnId}`))

  if (!currentColumn.val()) {
    return res.status(404).json({
      message: `Column with id ${columnId} was not found`
    })
  }

  const newCard = {
    text: req.body.text?.trim()
  }

  const validate = schemaValidator(AddCardSchema)
  const valid = validate(newCard)

  if (!valid) {
    res.status(400).json({
      message: 'Bad request',
      errors: validate.errors
    })
    res.end()
  } else {
    const cardId = ulid()
    await update(child(ref(database), `${dbPrefix}/boards/${id}/columns/${columnId}/cards/${cardId}`), newCard)
    res.status(204).end()
  }
}
