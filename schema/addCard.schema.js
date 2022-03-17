export const AddCardSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      minLength: 5,
      maxLength: 300
    }
  }
}
