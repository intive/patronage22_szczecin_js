import { ref, child, get, update, remove } from 'firebase/database'
import { dbConnect, dbPrefix } from '../../../../libs/dbClient'
import schemaValidator from '../../../../utils/schemaValidator'
import { patchBoardSchema } from '../../../../schema/patchBoard.schema'

const handlers = {
  get: getBoard,
  patch: patchBoard,
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
    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
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

async function patchBoard (req, res, database, dbPrefix) {
  const snapshot = await get(child(ref(database), `${dbPrefix}/boards/${req.query.id}`))
  if (!snapshot.exists()) return res.status(404).json()

  const data = {
    id: req.query.id,
    password: req.body.password
  }

  const validate = schemaValidator(patchBoardSchema)
  const valid = validate(data)

  if (!valid) {
    res.status(400).json({
      message: 'Bad request',
      errors: validate.errors
    })
    res.end()
  } else {
    await update(child(ref(database), `${dbPrefix}/boards/${req.query.id}`), { password: data.password })
    res.status(204).json()
  }
}

async function getBoard (req, res, database, dbPrefix) {
  const { id } = req.query
  const lookupId = await get(child(ref(database), `${dbPrefix}/boards/${id}`))

  if (!lookupId.val()) {
    return res.status(404).json({
      message: `Board with id ${id} was not found`
    })
  }

  const board = await lookupId.val()

  const columnCards = (cards) => {
    return Object.entries(cards).map(([id, val]) => {
      return ({
        id,
        text: val.text
      })
    })
  }

  const boardColumns = (columns) => {
    return Object.entries(columns).map(([id, val]) => {
      return ({
        id,
        name: val.name,
        cards: val.cards && columnCards(val.cards)
      })
    })
  }

  const { createdAt, password, ...modifyBoard } = board

  const boardDetails = {
    ...modifyBoard,
    id,
    columns: board.columns && boardColumns(board.columns),
    hasPassword: !!board.password
  }

  res.status(200).json(boardDetails)
}
