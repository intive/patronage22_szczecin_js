import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import getConfig from 'next/config'
const {
  serverRuntimeConfig: {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_URL,
    FIREBASE_PROJECTID
  }
} = getConfig()

module.exports = function firebase () {
  const app = initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_URL,
    projectId: FIREBASE_PROJECTID
  })

  return getFirestore(app)
}
