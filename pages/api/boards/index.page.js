import { dbConnect, dbPrefix } from '../../../libs/dbClient'
import { ref, child, get } from 'firebase/database'

const handlers = {
  get: getBoards
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
    res.setHeader('Allow', ['GET'])
    res.status(405)
    res.end(`Method ${method} Not Allowed`)
  }
}

async function getBoards (req, res, database, dbPrefix) {
  const snapshot = await get(child(ref(database), `${dbPrefix}/boards`))
  if (!snapshot.exists()) return res.json([])

  const snapshotValue = snapshot.val()
  const data = Object.keys(snapshot.val()).map(key => ({
    ...snapshotValue[key],
    id: key
  }))

  const getLocalDate = (date) => {
    const createdDate = new Date(date)
    const options = { day: 'numeric', month: 'short', year: 'numeric' }
    return createdDate.toLocaleDateString('en', options)
  }

  const getCardCount = (columns) => {
    if (!columns) {
      return 0
    } else {
      return Object.keys(columns).reduce((acc, key) => {
        acc = acc + Object.keys(columns[key].cards).length
        return acc
      }, 0)
    }
  }

  const tilesList = data.map(board => ({
    id: board.id,
    name: board.name,
    hasPassword: !!board.hasPassword,
    createdAt: getLocalDate(board.createdAt),
    cardCount: getCardCount(board.columns)
  }))

  res.json(tilesList)
}
