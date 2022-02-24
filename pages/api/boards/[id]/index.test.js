
/* globals describe, it, expect, jest */

import { createMocks } from 'node-mocks-http'
import handler from './index.page'
import { get } from 'firebase/database'

const database = {}

jest.mock('firebase/database')
jest.mock('../../../../libs/dbClient', () => ({
  dbConnect: jest.fn().mockImplementation(() => database),
  dbPrefix: 'prefix'
}))

describe('api/boards/[id]', () => {
  it('should return 405 if the method is not allowed', async () => {
    const id = 222
    const { req, res } = createMocks({
      method: 'PATCH',
      url: `/api/boards/${id}`
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(405)
    expect(res._getHeaders()).toEqual({ allow: ['DELETE'] })
  })
})
describe('api/boards/[id] delete', () => {
  it('should return status code 204 upon board deletion', async () => {
    const lookupId = {
      exists: jest.fn(),
      val: jest.fn()
    }

    get.mockResolvedValue(lookupId)

    lookupId.exists.mockResolvedValue(true)

    lookupId.val.mockResolvedValue({
      111: {
        name: 'board 1',
        createdAt: '2000-01-01T00:00:00.000Z'
      }
    })

    const id = 111
    const { req, res } = createMocks({
      method: 'DELETE',
      url: `/api/boards/${id}`,
      query: {
        id: 111
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(204)
  })

  it('should return status code 404 when board does not exist', async () => {
    const lookupId = {
      exists: jest.fn(),
      val: jest.fn()
    }

    get.mockResolvedValue(lookupId)

    lookupId.exists.mockResolvedValue(false)

    const id = 222
    const { req, res } = createMocks({
      method: 'DELETE',
      url: `api/boards/${id}`,
      query: {
        id: 222
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(404)
    expect(res._getJSONData()).toEqual({ message: `Board with id ${id} was not found` })
  })
})
