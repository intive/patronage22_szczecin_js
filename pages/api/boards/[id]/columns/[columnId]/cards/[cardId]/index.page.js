import { dbConnect, dbPrefix } from '../../../../../../../../libs/dbClient'
import { ref, child, get, update } from 'firebase/database'
import schemaValidator from '../../../../../../../../utils/schemaValidator'
import { PatchCardSchema } from '../../../../../../../../schema/patchCard.schema'

const handlers = {
  patch: patchCard
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
    res.setHeader('Allow', ['PATCH'])
    res.status(405)
    res.end(`Method ${method} Not Allowed`)
  }
}

async function patchCard (req, res, database, dbPrefix) {
  const { id, columnId, cardId } = req.query
  const cardLookupId = await get(child(ref(database), `${dbPrefix}/boards/${id}/columns/${columnId}/cards/${cardId}`))
  const cardData = await cardLookupId.val()

  if (!cardData) {
    return res.status(404).json({
      message: `Card with id ${cardId} was not found`
    })
  }

  const data = {
    text: req.body.text?.trim()
  }

  const validate = schemaValidator(PatchCardSchema)
  const valid = validate(data)

  if (!valid) {
    res.status(400).json({
      message: 'Bad request',
      errors: validate.errors
    })
    res.end()
  } else {
    await update(child(ref(database), `${dbPrefix}/boards/${id}/columns/${columnId}/cards/${cardId}`), data)
    res.status(200).end()
  }
}
