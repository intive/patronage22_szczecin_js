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

describe('api/boards/[id]/columns/[idColumn]/cards', () => {
  afterEach(() => {
    snapshot.exists.mockReturnValue(true)
  })

  it('should return 405 if the method is not allowed', async () => {
    const id = 222
    const idColumn = 444
    const { req, res } = createMocks({
      method: 'GET',
      url: `api/boards/${id}/columns/${idColumn}/cards`
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(405)
    expect(res._getHeaders()).toEqual({ allow: ['PATCH'] })
  })

  describe('PATCH method', () => {
    describe('should return status code 204', () => {
      it('when valid data is provided', async () => {
        const id = '-MyUI1OBnGARYI7fHjad'
        const idColumn = '01FYH3WNPR30RN5WRRAN89NVA3'

        const data = [
          {
            cards: [],
            id: '01FYH3WNPR30RN5WRRAN89NVA1',
            name: 'Nowa kolumna 1 Tablica test 5'
          },
          {
            cards: [],
            id: '01FYH3WNPR30RN5WRRAN89NVA2',
            name: 'Nowa kolumna 2 Tablica test 5'
          },
          {
            cards: [],
            id: '01FYH3WNPR30RN5WRRAN89NVA3',
            name: 'Nowa kolumna 3 Tablica test 5'
          }
        ]
        snapshot.val.mockResolvedValue(data)

        const { req, res } = createMocks({
          method: 'PATCH',
          url: `/api/boards/${id}/columns/${idColumn}}/cards`,
          body: {
            text: 'My new card'
          },
          query: {
            id: id,
            idColumn: idColumn
          }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toEqual(204)
        expect(res._getData()).toEqual('')
      })
    })

    describe('should return validation error', () => {
      it('for text in card length too long', async () => {
        const id = '-MyUI1OBnGARYI7fHjad'
        const idColumn = '01FYH3WNPR30RN5WRRAN89NVA3'

        const data = [
          {
            cards: [],
            id: '01FYH3WNPR30RN5WRRAN89NVA3',
            name: 'Nowa kolumna 1 Tablica test 5'
          }
        ]
        snapshot.val.mockResolvedValue(data)

        const { req, res } = createMocks({
          method: 'PATCH',
          url: `/api/boards/${id}/columns/${idColumn}}/cards`,
          body: {
            text: 'LoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumL'
          },
          query: {
            id: id,
            idColumn: idColumn
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
        const id = '-MyUI1OBnGARYI7fHjad'
        const idColumn = '01FYH3WNPR30RN5WRRAN89NVA3'

        const data = [
          {
            cards: [],
            id: '01FYH3WNPR30RN5WRRAN89NVA3',
            name: 'Nowa kolumna 1 Tablica test 5'
          }
        ]
        snapshot.val.mockResolvedValue(data)

        const { req, res } = createMocks({
          method: 'PATCH',
          url: `/api/boards/${id}/columns/${idColumn}}/cards`,
          body: {
            text: 'My'
          },
          query: {
            id: id,
            idColumn: idColumn
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

      it('should return status code 404 when column does not exist', async () => {
        const snapshot = {
          exists: jest.fn(),
          val: jest.fn()
        }

        get.mockResolvedValue(snapshot)

        snapshot.exists.mockResolvedValue(false)

        const id = '-MyUI1OBnGARYI7fHjad'
        const idColumn = '01FYH3WNPR30RN5WRRAN89NVA3x'

        const { req, res } = createMocks({
          method: 'PATCH',
          url: `/api/boards/${id}/columns/${idColumn}}/cards`,
          body: {
            text: 'My new card'
          },
          query: {
            id: id,
            idColumn: idColumn
          }
        })

        await handler(req, res)

        expect(res._getStatusCode()).toEqual(404)
        expect(res._getJSONData()).toEqual({ message: `Column with id ${idColumn} was not found` })
      })
    })
  })
})
