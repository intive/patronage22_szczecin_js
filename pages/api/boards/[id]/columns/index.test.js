/* globals describe, it, expect, jest  */

import { createMocks } from 'node-mocks-http'
import { get } from 'firebase/database'
import handler from './index.page'

const database = {}

jest.mock('firebase/database')
jest.mock('../../../../../libs/dbClient', () => ({
  dbConnect: jest.fn().mockImplementation(() => database),
  dbPrefix: 'prefix'
}))

const snapshot = {
  exists: jest.fn(),
  val: jest.fn()
}

get.mockResolvedValue(snapshot)

describe('api/boards/[id]/columns', () => {
  it('should return status code 405 if the method is not allowed', async () => {
    const id = 222
    const { req, res } = createMocks({
      method: 'DELETE',
      url: `/api/boards/${id}/columns`
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(405)
    expect(res._getHeaders()).toEqual({ allow: ['POST'] })
  })
})

describe('api/boards/[id]/columns patch', () => {
  it('should return status code 200 when valid name is provided', async () => {
    snapshot.exists.mockResolvedValue(true)
    snapshot.val.mockResolvedValue({
      name: 'board 1',
      createdAt: '2000-01-01T00:00:00.000Z'
    })

    const id = 222
    const { req, res } = createMocks({
      method: 'POST',
      url: `/api/boards/${id}/columns`,
      body: {
        name: 'New column'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(200)
    expect(res._getData()).toEqual('')
  })

  it('should return status code 404 when board does not exist', async () => {
    snapshot.exists.mockResolvedValue(false)
    snapshot.val.mockResolvedValue()

    const id = 222
    const { req, res } = createMocks({
      method: 'POST',
      url: `/api/boards/${id}/columns`,
      body: {
        name: 'New column'
      },
      query: {
        id: id
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(404)
    expect(res._getJSONData()).toEqual({ message: `Board with id ${id} was not found` })
  })

  it('should return validation error for too short column name', async () => {
    snapshot.exists.mockResolvedValue(true)
    snapshot.val.mockResolvedValue({
      name: 'board 1',
      createdAt: '2000-01-01T00:00:00.000Z'
    })

    const id = 222
    const { req, res } = createMocks({
      method: 'POST',
      url: `/api/boards/${id}/columns`,
      body: {
        name: 'New'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(400)
    expect(res._getJSONData()).toEqual({
      message: 'Bad request',
      errors: [
        {
          instancePath: '/name',
          schemaPath: '#/properties/name/minLength',
          keyword: 'minLength',
          params: {
            limit: 5
          },
          message: 'must NOT have fewer than 5 characters'
        }
      ]
    })
  })

  it('should return validation error for too long column name', async () => {
    snapshot.exists.mockResolvedValue(true)
    snapshot.val.mockResolvedValue({
      name: 'board 1',
      createdAt: '2000-01-01T00:00:00.000Z'
    })

    const id = 222
    const { req, res } = createMocks({
      method: 'POST',
      url: `/api/boards/${id}/columns`,
      body: {
        name: 'Column name that extends 30 characters'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(400)
    expect(res._getJSONData()).toEqual({
      message: 'Bad request',
      errors: [
        {
          instancePath: '/name',
          schemaPath: '#/properties/name/maxLength',
          keyword: 'maxLength',
          params: {
            limit: 30
          },
          message: 'must NOT have more than 30 characters'
        }
      ]
    })
  })

  it('should return validation error for inaccurate property name in body', async () => {
    snapshot.exists.mockResolvedValue(true)
    snapshot.val.mockResolvedValue({
      name: 'board 1',
      createdAt: '2000-01-01T00:00:00.000Z'
    })

    const id = 222
    const { req, res } = createMocks({
      method: 'POST',
      url: `/api/boards/${id}/columns`,
      body: {
        namee: 'Wrong body name'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(400)
    expect(res._getJSONData()).toEqual({
      message: 'Bad request',
      errors: [
        {
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          params: {
            missingProperty: 'name'
          },
          message: 'must have required property \'name\''
        }
      ]
    })
  })
})
