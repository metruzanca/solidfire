// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const appConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

console.log(appConfig)

export const PROJECT_ID = appConfig.projectId
export const APP_STORAGE_BUCKET = `${appConfig.projectId}.appspot.com`

// https://firebase.google.com/docs/web/setup#available-libraries
export const app = initializeApp(appConfig)
// https://firebase.google.com/docs/storage/web/start
export const storage = getStorage(app)
export const firestore = getFirestore(app)
