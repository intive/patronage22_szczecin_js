/* globals describe, it, expect, jest, afterEach */

import { get, update } from 'firebase/database'
import { createMocks } from 'node-mocks-http'
import handler from './index.page'

const database = {}

jest.mock('firebase/database')
jest.mock('../../../../libs/dbClient', () => ({
  dbConnect: jest.fn().mockImplementation(() => database),
  dbPrefix: 'prefix'
}))

const snapshot = {
  exists: jest.fn(),
  val: jest.fn()
}

get.mockResolvedValue(snapshot)
update.mockResolvedValue()

describe('api/boards/[id]', () => {
  afterEach(() => {
    snapshot.exists.mockReturnValue(true)
  })

  it('should return 405 if the method is not allowed', async () => {
    const id = 222
    const { req, res } = createMocks({
      method: 'GET',
      url: `/api/boards/${id}`
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(405)
    expect(res._getHeaders()).toEqual({ allow: ['PATCH', 'DELETE'] })
  })

  describe('PATCH method', () => {
    describe('should return status code 204', () => {
      it('when valid password is provided', async () => {
        const { req, res } = createMocks({
          method: 'PATCH',
          url: '/api/boards/01FV73TD3GSJ82YJE85XJRBT13',
          body: {
            password: '12345678'
          },
          query: {
            id: '01FV73TD3GSJ82YJE85XJRBT13'
          }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toEqual(204)
        expect(res._getData()).toEqual('')
      })

      it('when valid id and null password is provided', async () => {
        const { req, res } = createMocks({
          method: 'PATCH',
          url: '/api/boards/01FV73TD3GSJ82YJE85XJRBT13',
          body: {
            password: null
          },
          query: {
            id: '01FV73TD3GSJ82YJE85XJRBT13'
          }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toEqual(204)
        expect(res._getData()).toEqual('')
      })
    })

    describe('should return validation error', () => {
      it('for missing id', async () => {
        const { req, res } = createMocks({
          method: 'PATCH',
          url: '/api/boards/01FV73TD3GSJ82YJE85XJRBT13',
          body: {
            password: '12345678'
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
                missingProperty: 'id'
              },
              message: 'must have required property \'id\''
            }
          ]
        })
      })

      it('for password length too long', async () => {
        const { req, res } = createMocks({
          method: 'PATCH',
          url: '/api/boards/01FV73TD3GSJ82YJE85XJRBT13',
          body: {
            password: '12345678910'
          },
          query: {
            id: '01FV73TD3GSJ82YJE85XJRBT13'
          }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toEqual(400)
        expect(res._getJSONData()).toEqual({
          message: 'Bad request',
          errors: [
            {
              instancePath: '/password',
              schemaPath: '#/properties/password/maxLength',
              keyword: 'maxLength',
              params: { limit: 8 },
              message: 'must NOT have more than 8 characters'
            }
          ]
        })
      })

      it('for password length too short', async () => {
        const { req, res } = createMocks({
          method: 'PATCH',
          url: '/api/boards/01FV73TD3GSJ82YJE85XJRBT13',
          body: {
            password: '123'
          },
          query: {
            id: '01FV73TD3GSJ82YJE85XJRBT13'
          }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toEqual(400)
        expect(res._getJSONData()).toEqual({
          message: 'Bad request',
          errors: [
            {
              instancePath: '/password',
              schemaPath: '#/properties/password/minLength',
              keyword: 'minLength',
              params: { limit: 8 },
              message: 'must NOT have fewer than 8 characters'
            }
          ]
        })
      })

      it('for password sent as string with non digits characters', async () => {
        const { req, res } = createMocks({
          method: 'PATCH',
          url: '/api/boards/01FV73TD3GSJ82YJE85XJRBT13',
          body: {
            password: 'abcd1234'
          },
          query: {
            id: '01FV73TD3GSJ82YJE85XJRBT13'
          }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toEqual(400)
        expect(res._getJSONData()).toEqual({
          message: 'Bad request',
          errors: [
            {
              instancePath: '/password',
              schemaPath: '#/properties/password/pattern',
              keyword: 'pattern',
              params: {
                pattern: '^[0-9]*$'
              },
              message: 'must match pattern "^[0-9]*$"'
            }
          ]
        })
      })
    })
  })

  describe('DELETE method', () => {
    it('should return status code 204 upon board deletion', async () => {
      get.mockResolvedValue(snapshot)

      snapshot.exists.mockResolvedValue(true)

      snapshot.val.mockResolvedValue({
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
      const snapshot = {
        exists: jest.fn(),
        val: jest.fn()
      }

      get.mockResolvedValue(snapshot)

      snapshot.exists.mockResolvedValue(false)

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
})
