const { envVars } = require('./config/env-vars')
const environmentVariables = envVars(process.env)

module.exports = {
  pageExtensions: ['page.js'],
  experimental: {
    styledComponents: true
  },
  serverRuntimeConfig: {
    FIREBASE_PROJECTID: environmentVariables.FIREBASE_PROJECTID,
    FIREBASE_AUTH_DOMAIN: environmentVariables.FIREBASE_AUTH_DOMAIN,
    FIREBASE_URL: environmentVariables.FIREBASE_URL,
    FIREBASE_API_KEY: environmentVariables.FIREBASE_API_KEY
  }
}
