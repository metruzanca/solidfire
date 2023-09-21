import { FirebaseApp as FirebaseAppType, initializeApp } from 'firebase/app'
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import { Firestore, getFirestore } from 'firebase/firestore'
import { FirebaseStorage, getStorage } from 'firebase/storage'
import { Component, JSX, createContext, createSignal, from, useContext } from 'solid-js'

type FirebaseContextType = {
  app: FirebaseAppType
  firestore: Firestore
  storage: FirebaseStorage
  auth: Auth
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null)

type Props = {
  config: {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId?: string
  }
  children: JSX.Element
}
export const FirebaseApp: Component<Props> = props => {
  // TODO firebase-admin for server-side rendering
  const app = initializeApp(props.config)
  const firestore = getFirestore(app)
  const storage = getStorage(app)
  const auth = getAuth(app)

  // TODO move this out of here
  onAuthStateChanged(auth, user => {
    if (user) {
      console.info('Logged in as:', user)
    }
  })

  return (
    <FirebaseContext.Provider value={{ app, firestore, storage, auth }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext)
  console.log(context)

  if (!context) throw new Error('Firebase context not found')
  return context
}
