export const patchBoardSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    password: {
      type: [
        'string',
        'null'
      ],
      minLength: 8,
      maxLength: 8,
      pattern: '^[0-9]*$'
    }
  },
  required: ['id']
}
