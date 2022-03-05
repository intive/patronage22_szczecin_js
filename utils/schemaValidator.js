import Ajv from 'ajv'
const ajv = new Ajv({ allErrors: true })

export default function schemaValidator (schema) {
  return ajv.compile(schema)
}
