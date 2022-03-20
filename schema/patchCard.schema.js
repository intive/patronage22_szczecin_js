export const PatchCardSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      minLength: 5,
      maxLength: 300
    }
  },
  required: ['text']
}
