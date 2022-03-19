/* globals describe, it, expect, jest  */

import { createMocks } from 'node-mocks-http'
import { get } from 'firebase/database'
import handler from './index.page'

const database = {}

jest.mock('firebase/database')
jest.mock('../../../../../../libs/dbClient', () => ({
  dbConnect: jest.fn().mockImplementation(() => database),
  dbPrefix: 'prefix'
}))

const snapshot = {
  exists: jest.fn(),
  val: jest.fn()
}

get.mockResolvedValue(snapshot)

describe('api/boards/[id]/columns/[columnId]', () => {
  it('should return status code 405 if the method is not allowed', async () => {
    const id = 111
    const columnId = 222
    const { req, res } = createMocks({
      method: 'GET',
      url: `/api/boards/${id}/columns/${columnId}`
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(405)
    expect(res._getHeaders()).toEqual({ allow: ['DELETE'] })
  })
})

describe('api/boards/[id]/columns/[columnId] delete', () => {
  it('should return status code 204 on success deletion', async () => {
    snapshot.exists.mockReturnValue(true)
    snapshot.val.mockResolvedValue({
      name: 'column 1'
    })

    const id = 111
    const columnId = 222
    const { req, res } = createMocks({
      method: 'DELETE',
      url: `/api/boards/${id}/columns/${columnId}`,
      query: {
        id: id,
        columnId: columnId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(204)
    expect(res._getData()).toEqual('')
  })

  it('should return status code 404 when column was not found', async () => {
    snapshot.exists.mockResolvedValue(false)
    snapshot.val.mockResolvedValue()

    const id = 111
    const columnId = 222
    const { req, res } = createMocks({
      method: 'DELETE',
      url: `/api/boards/${id}/columns/${columnId}`,
      query: {
        id: id,
        columnId: columnId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(404)
    expect(res._getJSONData()).toEqual({ message: `Column with id ${columnId} was not found` })
  })
})
