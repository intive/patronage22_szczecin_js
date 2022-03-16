export const AddColumnSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 5,
      maxLength: 30
    }
  },
  required: ['name']
}
