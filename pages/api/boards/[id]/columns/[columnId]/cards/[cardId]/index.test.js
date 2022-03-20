/* globals describe, it, expect, jest */

import { get } from 'firebase/database'
import { createMocks } from 'node-mocks-http'
import handler from './index.page'

const database = {}

jest.mock('firebase/database')
jest.mock('../../../../../../../../libs/dbClient', () => ({
  dbConnect: jest.fn().mockImplementation(() => database),
  dbPrefix: 'prefix'
}))

const snapshot = {
  exists: jest.fn(),
  val: jest.fn()
}

get.mockResolvedValue(snapshot)

describe('api/boards/[id]/columns/[columnId]/cards/[cardId]', () => {
  it('should return status code 405 if the method is not allowed', async () => {
    const id = 111
    const columnId = 222
    const cardId = 333
    const { req, res } = createMocks({
      method: 'GET',
      url: `/api/boards/${id}/columns/${columnId}/cards/${cardId}`
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(405)
    expect(res._getHeaders()).toEqual({ allow: ['PATCH'] })
  })
})

describe('api/boards/[id]/columns/[columnId]/cards/[cardId] patch', () => {
  it('should return status code 200 when valid data is provided', async () => {
    snapshot.exists.mockReturnValue(true)
    snapshot.val.mockResolvedValue({
      text: 'Card 1'
    })

    const id = 111
    const columnId = 222
    const cardId = 333
    const { req, res } = createMocks({
      method: 'PATCH',
      url: `/api/boards/${id}/columns/${columnId}/cards/${cardId}`,
      body: {
        text: 'Updated card text'
      },
      query: {
        id: id,
        columnId: columnId,
        cardId: cardId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(200)
    expect(res._getData()).toEqual('')
  })

  it('should return status code 404 when card with provided id does not exist', async () => {
    snapshot.exists.mockReturnValue(false)
    snapshot.val.mockResolvedValue()

    const id = 111
    const columnId = 222
    const cardId = 333
    const { req, res } = createMocks({
      method: 'PATCH',
      url: `/api/boards/${id}/columns/${columnId}/cards/${cardId}`,
      body: {
        text: 'Updated card text'
      },
      query: {
        id: id,
        columnId: columnId,
        cardId: cardId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toEqual(404)
    expect(res._getJSONData()).toEqual({ message: `Card with id ${cardId} was not found` })
  })

  it('should return validation error for too short card text', async () => {
    snapshot.exists.mockResolvedValue(true)
    snapshot.val.mockResolvedValue({
      text: 'Card 1'
    })

    const id = 111
    const columnId = 222
    const cardId = 333
    const { req, res } = createMocks({
      method: 'PATCH',
      url: `/api/boards/${id}/columns/${columnId}/cards/${cardId}`,
      body: {
        text: 'Text'
      },
      query: {
        id: id,
        columnId: columnId,
        cardId: cardId
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
          params: {
            limit: 5
          },
          message: 'must NOT have fewer than 5 characters'
        }
      ]
    })
  })

  it('should return validation error for too long card text', async () => {
    snapshot.exists.mockResolvedValue(true)
    snapshot.val.mockResolvedValue({
      text: 'Card 1'
    })

    const id = 111
    const columnId = 222
    const cardId = 333
    const { req, res } = createMocks({
      method: 'PATCH',
      url: `/api/boards/${id}/columns/${columnId}/cards/${cardId}`,
      body: {
        text: 'LoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumL'
      },
      query: {
        id: id,
        columnId: columnId,
        cardId: cardId
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
          params: {
            limit: 300
          },
          message: 'must NOT have more than 300 characters'
        }
      ]
    })
  })

  it('should return validation error for inaccurate name in body', async () => {
    snapshot.exists.mockResolvedValue(true)
    snapshot.val.mockResolvedValue({
      text: 'Card 1'
    })

    const id = 111
    const columnId = 222
    const cardId = 333
    const { req, res } = createMocks({
      method: 'PATCH',
      url: `/api/boards/${id}/columns/${columnId}/cards/${cardId}`,
      body: {
        wrong: 'Updated text'
      },
      query: {
        id: id,
        columnId: columnId,
        cardId: cardId
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
})
