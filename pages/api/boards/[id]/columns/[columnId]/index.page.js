import { dbConnect, dbPrefix } from '../../../../../../libs/dbClient'
import { ref, child, get, remove } from 'firebase/database'

const handlers = {
  delete: deleteColumn
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
    res.setHeader('Allow', ['DELETE'])
    res.status(405)
    res.end(`Method ${method} Not Allowed`)
  }
}

async function deleteColumn (req, res, database, dbPrefix) {
  const { id, columnId } = req.query
  const columnLookupId = await get(child(ref(database), `${dbPrefix}/boards/${id}/columns/${columnId}`))
  const columnData = await columnLookupId.val()

  if (!columnData) {
    return res.status(404).json({
      message: `Column with id ${columnId} was not found`
    })
  }

  await remove(child(ref(database), `${dbPrefix}/boards/${id}/columns/${columnId}`))
  res.status(204).end()
}
