import admin from "firebase-admin";
import { Credential } from "firebase-admin/app";
import { Component, JSX, createContext, useContext } from "solid-js";

const serviceAccount = 'serviceAccountKey.json'



type FirebaseContextType = {
  // app: FirebaseAppType;
  // firestore: Firestore;
  // storage: FirebaseStorage;
  // auth: Auth;
}

export const FirebaseContextServer = createContext<FirebaseContextType | null>(null);

type Props = {
  credential: string;
  children: JSX.Element;
}
export const FirebaseAppServer: Component<Props> = (props) => {
  // TODO firebase-admin for server-side rendering
  const app = admin.initializeApp({
    credential: admin.credential.cert({
      // TODO
    }
    )
  }, 'server');
  const firestore = app.firestore()
  const storage = app.storage()
  const auth = null as any //app.auth()

  return (
    <FirebaseContextServer.Provider value={{ app, firestore, storage, auth }}>
      {props.children}
    </FirebaseContextServer.Provider>
  )
}

export const useFirebaseServer = () => {
  const context = useContext(FirebaseContextServer)
  console.log(context);

  if (!context) throw new Error("Firebase context not found")
  return context
}