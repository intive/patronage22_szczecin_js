/* globals describe, it, expect, jest, afterEach */

import { get } from 'firebase/database'
import { createMocks } from 'node-mocks-http'
import handler from './index.page'

const database = {}

jest.mock('firebase/database')
jest.mock('../../../../../../../libs/dbClient', () => ({
  dbConnect: jest.fn().mockImplementation(() => database),
  dbPrefix: 'prefix'
}))

const snapshot = {
  exists: jest.fn(),
  val: jest.fn()
}

get.mockResolvedValue(snapshot)

describe('api/boards/[id]/columns/[columnId]/cards', () => {
  afterEach(() => {
    snapshot.exists.mockReturnValue(true)
  })

  it('should return 405 if the method is not allowed', async () => {
    const id = 222
    const columnId = 444
    const { req, res } = createMocks({
      method: 'GET',
      url: `api/boards/${id}/columns/${columnId}/cards`
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(405)
    expect(res._getHeaders()).toEqual({ allow: ['POST'] })
  })

  describe('POST method', () => {
    describe('should return status code 204', () => {
      it('when valid data is provided', async () => {
        const id = '01FZ2W9T665ZCZS85D3Q2NP4ER'
        const columnId = '01FYH3WNPR30RN5WRRAN89NVA3'

        const data = {
          cards: {
            '01FZ2ZAVEK7TF7PQCJ3M5TDP94': { text: 'Nowa kartka 1' },
            '01FZ2ZAZ9JX5HPYNC1X17B6MQ6': { text: 'Nowa kartka 2' }
          },
          name: 'Nowa kolumna 3'
        }
        snapshot.val.mockResolvedValue(data)

        const { req, res } = createMocks({
          method: 'POST',
          url: `/api/boards/${id}/columns/${columnId}}/cards`,
          body: {
            text: 'My new card'
          },
          query: {
            id: id,
            columnId: columnId
          }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toEqual(204)
        expect(res._getData()).toEqual('')
      })
    })

    describe('should return validation error', () => {
      it('for text in card length too long', async () => {
        const id = '01FZ2W9T665ZCZS85D3Q2NP4ER'
        const columnId = '01FYH3WNPR30RN5WRRAN89NVA3'

        const data = {
          cards: {
            '01FZ2ZAVEK7TF7PQCJ3M5TDP94': { text: 'Nowa kartka 1' },
            '01FZ2ZAZ9JX5HPYNC1X17B6MQ6': { text: 'Nowa kartka 2' }
          },
          name: 'Nowa kolumna 3'
        }
        snapshot.val.mockResolvedValue(data)

        const { req, res } = createMocks({
          method: 'POST',
          url: `/api/boards/${id}/columns/${columnId}}/cards`,
          body: {
            text: 'LoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumL'
          },
          query: {
            id: id,
            columnId: columnId
          }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toEqual(400)
        expect(res._getJSONData()).toEqual({
          message: 'Bad request',
          errors: [
            {
              instancePath: '/text',
              schemaPath: '#/properties/text/maxLength',
              keyword: 'maxLength',
              params: { limit: 300 },
              message: 'must NOT have more than 300 characters'
            }
          ]
        })
      })

      it('for text in card length too short', async () => {
        const id = '01FZ2W9T665ZCZS85D3Q2NP4ER'
        const columnId = '01FYH3WNPR30RN5WRRAN89NVA3'

        const data = [
          {
            cards: [],
            id: '01FYH3WNPR30RN5WRRAN89NVA3',
            name: 'Nowa kolumna 1 Tablica test 5'
          }
        ]
        snapshot.val.mockResolvedValue(data)

        const { req, res } = createMocks({
          method: 'POST',
          url: `/api/boards/${id}/columns/${columnId}}/cards`,
          body: {
            text: 'My'
          },
          query: {
            id: id,
            columnId: columnId
          }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toEqual(400)
        expect(res._getJSONData()).toEqual({
          message: 'Bad request',
          errors: [
            {
              instancePath: '/text',
              schemaPath: '#/properties/text/minLength',
              keyword: 'minLength',
              params: { limit: 5 },
              message: 'must NOT have fewer than 5 characters'
            }
          ]
        })
      })

      it('for inaccurate property name in body', async () => {
        const id = '01FZ2W9T665ZCZS85D3Q2NP4ER'
        const columnId = '01FYH3WNPR30RN5WRRAN89NVA3'

        const data = {
          cards: {
            '01FZ2ZAVEK7TF7PQCJ3M5TDP94': { text: 'Nowa kartka 1' },
            '01FZ2ZAZ9JX5HPYNC1X17B6MQ6': { text: 'Nowa kartka 2' }
          },
          name: 'Nowa kolumna 3'
        }
        snapshot.val.mockResolvedValue(data)

        const { req, res } = createMocks({
          method: 'POST',
          url: `/api/boards/${id}/columns/${columnId}}/cards`,
          body: {
            text11111: 'My board'
          },
          query: {
            id: id,
            columnId: columnId
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
                missingProperty: 'text'
              },
              message: 'must have required property \'text\''
            }
          ]
        })
      })

      it('for property equals to null', async () => {
        const id = '01FZ2W9T665ZCZS85D3Q2NP4ER'
        const columnId = '01FYH3WNPR30RN5WRRAN89NVA3'

        const data = {
          cards: {
            '01FZ2ZAVEK7TF7PQCJ3M5TDP94': { text: 'Nowa kartka 1' },
            '01FZ2ZAZ9JX5HPYNC1X17B6MQ6': { text: 'Nowa kartka 2' }
          },
          name: 'Nowa kolumna 3'
        }
        snapshot.val.mockResolvedValue(data)

        const { req, res } = createMocks({
          method: 'POST',
          url: `/api/boards/${id}/columns/${columnId}}/cards`,
          body: {
            text: null
          },
          query: {
            id: id,
            columnId: columnId
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
                missingProperty: 'text'
              },
              message: 'must have required property \'text\''
            }
          ]
        })
      })

      it('should return status code 404 when column does not exist', async () => {
        const snapshot = {
          exists: jest.fn(),
          val: jest.fn()
        }

        get.mockResolvedValue(snapshot)

        snapshot.exists.mockResolvedValue(false)

        const id = '01FZ2W9T665ZCZS85D3Q2NP4ER'
        const columnId = '01FYSD14CFFR95REF0BS0Z0N2C'

        const { req, res } = createMocks({
          method: 'POST',
          url: `/api/boards/${id}/columns/${columnId}/cards`,
          body: {
            text: 'My new card'
          },
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
  })
})
