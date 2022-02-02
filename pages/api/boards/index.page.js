import { ref, child, get } from 'firebase/database'
import { dbConnect, dbPrefix } from '../../../libs/dbClient'

export default async function handler (req, res) {
  let database

  try {
    database = await dbConnect()
  } catch (err) {
    console.error(err)
    res.statusCode = 400
    res.end()
  }

  const snapshot = await get(child(ref(database), `${dbPrefix}/boards`))
  if (!snapshot.exists()) return []

  const snapshotValue = snapshot.val()
  const data = Object.keys(snapshot.val()).map(key => ({
    ...snapshotValue[key],
    id: key
  }))

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.send(data)
  res.end()
}
