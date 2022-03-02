/* globals describe, it, expect, jest  */

import { createMocks } from 'node-mocks-http'
import { get } from 'firebase/database'
import handler from './index.page'

const database = {}

jest.mock('firebase/database')
jest.mock('../../../libs/dbClient', () => ({
  dbConnect: jest.fn().mockImplementation(() => database),
  dbPrefix: 'prefix'
}))

const snapshot = {
  exists: jest.fn(),
  val: jest.fn()
}

get.mockResolvedValue(snapshot)

describe('api/boards', () => {
  it('should return 405 if the method is not allowed', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      url: '/api/boards'
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(405)
    expect(res._getHeaders()).toEqual({ allow: ['GET', 'POST'] })
  })
})

describe('api/boards get', () => {
  it('should return a board without a password', async () => {
    snapshot.exists.mockReturnValue(true)

    snapshot.val.mockReturnValue({
      111: {
        name: 'board 1',
        createdAt: '1984-10-16T12:30:00.000Z'
      }
    })

    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/boards'
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(200)
    expect(res._getJSONData()).toEqual([{
      id: '111',
      name: 'board 1',
      cardCount: 0,
      hasPassword: false,
      createdAt: 'Oct 16, 1984'
    }])
  })

  it('should return two boards: one with a password and one without a password', async () => {
    snapshot.exists.mockReturnValue(true)

    snapshot.val.mockReturnValue({
      222: {
        name: 'board 2',
        password: 12345678,
        createdAt: '1984-06-22T07:30:00.000Z'
      },
      333: {
        name: 'board 3',
        createdAt: '2000-01-01T00:00:00.000Z'
      }
    })

    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/boards'
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(200)
    expect(res._getJSONData()).toEqual([
      {
        id: '222',
        name: 'board 2',
        cardCount: 0,
        hasPassword: true,
        createdAt: 'Jun 22, 1984'
      },
      {
        id: '333',
        name: 'board 3',
        cardCount: 0,
        hasPassword: false,
        createdAt: 'Jan 1, 2000'
      }
    ])
  })

  it('should return a board with five cards', async () => {
    snapshot.exists.mockReturnValue(true)

    snapshot.val.mockReturnValue({
      444: {
        name: 'board 76',
        columns: { obj: { cards: [1, 2, 3, 4, 5] } },
        createdAt: '1984-10-16T12:30:00.000Z'
      }
    })

    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/boards'
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(200)
    expect(res._getJSONData()).toEqual([{
      id: '444',
      name: 'board 76',
      cardCount: 5,
      hasPassword: false,
      createdAt: 'Oct 16, 1984'
    }])
  })

  it('should return an empty array if snapshot does not exist', async () => {
    snapshot.exists.mockReturnValue(false)

    const { req, res } = createMocks({
      req: 'GET',
      url: '/api/boards'
    }, {
      res: []
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(200)
    expect(res._getJSONData()).toEqual([])
  })
})

describe('api/boards post', () => {
  describe('should return status code 204', () => {
    it('when valid name is provided', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        url: '/api/boards',
        body: {
          name: 'my board'
        }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toEqual(204)
      expect(res._getData()).toEqual('')
    })

    describe('should return validation error', () => {
      it('for name length too short', async () => {
        const { req, res } = createMocks({
          method: 'POST',
          url: '/api/boards',
          body: {
            name: '123'
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

      it('for name length too long', async () => {
        const { req, res } = createMocks({
          method: 'POST',
          url: '/api/boards',
          body: {
            name: 'Praesent consequat eu velit in rutrum. Sed egestas.'
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
                limit: 50
              },
              message: 'must NOT have more than 50 characters'
            }
          ]
        })
      })
    })
  })
})
