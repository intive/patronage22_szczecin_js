import { dbConnect, dbPrefix } from '../../../../../../../libs/dbClient'
import { ref, child, get, update } from 'firebase/database'
import { ulid } from 'ulid'
import schemaValidator from '../../../../../../../utils/schemaValidator'
import { AddCardSchema } from '../../../../../../../schema/addCard.schema'

const handlers = {
  patch: addCard
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

async function addCard (req, res, database, dbPrefix) {
  const { id, idColumn } = req.query
  const columnLookupId = await get(child(ref(database), `${dbPrefix}/boards/${id}/columns`))
  const columnData = await columnLookupId.val()

  if (!columnData || columnData.findIndex(column => column.id === idColumn) === -1) {
    return res.status(404).json({
      message: `Column with id ${idColumn} was not found`
    })
  }

  const columnIndex = columnData.findIndex(column => column.id === idColumn)

  const newCard = {
    id: ulid(),
    text: req.body.text.trim()
  }

  if (!columnData[columnIndex]?.cards?.length) {
    columnData[columnIndex].cards = []
  }
  columnData[columnIndex].cards.push(newCard)

  const validate = schemaValidator(AddCardSchema)
  const valid = validate(newCard)

  if (!valid) {
    res.status(400).json({
      message: 'Bad request',
      errors: validate.errors
    })
    res.end()
  } else {
    await update(child(ref(database), `${dbPrefix}/boards/${id}/columns/${columnIndex}`), { cards: columnData[columnIndex].cards })
    res.status(204).end()
  }
}
