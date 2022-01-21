const { str, url, cleanEnv } = require('envalid')

exports.envVars = function (envs) {
  return cleanEnv(envs, {
    FIREBASE_PROJECTID: str(),
    FIREBASE_AUTH_DOMAIN: str(),
    FIREBASE_URL: url(),
    FIREBASE_API_KEY: str()
  }, { strict: true, dotEnvPath: null })
}
