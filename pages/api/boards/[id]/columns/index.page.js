import { dbConnect, dbPrefix } from '../../../../../libs/dbClient'
import { ref, child, get, update } from 'firebase/database'
import { ulid } from 'ulid'
import schemaValidator from '../../../../../utils/schemaValidator'
import { AddColumnSchema } from '../../../../../schema/addColumn.schema'

const handlers = {
  post: addColumn
}

export default async function handler (req, res) {
  let database

  try {
    database = await dbConnect()
  } catch (err) {
    console.log(err)
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

async function addColumn (req, res, database, dbPrefix) {
  const { id } = req.query
  const lookupId = await get(child(ref(database), `${dbPrefix}/boards/${id}`))
  const boardData = await lookupId.val()

  if (!boardData) {
    return res.status(404).json({
      message: `Board with id ${id} was not found`
    })
  }

  const data = {
    name: req.body.name?.trim()
  }

  const validate = schemaValidator(AddColumnSchema)
  const valid = validate(data)

  if (!valid) {
    res.status(400).json({
      message: 'Bad request',
      errors: validate.errors
    })
    res.end()
  } else {
    const columnId = ulid()
    await update(child(ref(database), `${dbPrefix}/boards/${id}/columns/${columnId}`), data)
    res.status(200).end()
  }
}
