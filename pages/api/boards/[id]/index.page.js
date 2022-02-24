import { dbConnect, dbPrefix } from '../../../../libs/dbClient'
import { ref, child, get, remove } from 'firebase/database'

const handlers = {
  delete: deleteBoard
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
    res.setHeader('Allow', ['DELETE'])
    res.status(405)
    res.end(`Method ${method} Not Allowed`)
  }
}

async function deleteBoard (req, res, database, dbPrefix) {
  const { id } = req.query
  const lookupId = await get(child(ref(database), `${dbPrefix}/boards/${id}`))

  if (!lookupId.val()) {
    return res.status(404).json({
      message: `Board with id ${id} was not found`
    })
  }

  await remove(child(ref(database), `${dbPrefix}/boards/${id}`))
  res.status(204).end()
}
