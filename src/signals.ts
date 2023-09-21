// Inspired by https://github.com/codediodeio/sveltefire & previous stuff I did here https://gist.github.com/metruzanca/e516aac42c79d16c894883e88d8af5f8

import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  onSnapshot,
  query,
  QueryCompositeFilterConstraint,
  QueryNonFilterConstraint,
} from 'firebase/firestore'
import { Accessor, from } from 'solid-js'

export type Document<T> = T & {
  id: string
  ref: DocumentReference<T>
}

export type ColRef<T> = string | Query<T, DocumentData> | CollectionReference<T, DocumentData>

// TODO solid context instead of firestore everywhere

export const now = () => new Date().toISOString()

export function fromCol<T>(
  firestore: Firestore|undefined,
  ref: ColRef<T>,
  startWith: T[] = [],
): Accessor<T[]> {
  let unsubscribe: () => void

  // TODO firebase-admin
  // // Fallback for SSR
  // if (!globalThis.window) {
  //   const { subscribe } = writable(startWith);
  //   return {
  //     subscribe,
  //     ref: null,
  //   };
  // }

  // Fallback for missing SDK
  if (!firestore) {
    // eslint-disable-next-line no-console
    console.warn('Firestore is not initialized. Are you missing FirebaseApp as a parent component?')
    const signal = () => []
    return signal
  }

  const collectionRef =
    typeof ref === 'string' ? collection(firestore, ref) : (ref as CollectionReference)

  const signal = from<T[]>(set => {
    set(startWith)

    unsubscribe = onSnapshot(collectionRef, (snapshot: QuerySnapshot) => {
      const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => {
        return { id: doc.id, ref: doc.ref, ...doc.data() } as T
      })
      set(data)
    })

    return unsubscribe
  })

  return signal as Accessor<T[]>
}

export type DocRef<T> = string | DocumentReference<T>

export function fromDoc<T>(
  firestore: Firestore|undefined,
  ref: DocRef<T>,
  startWith?: T,
): Accessor<T | undefined> {
  let unsubscribe: () => void

  // Fallback for SSR
  // if (!globalThis.window) {
  //   const { subscribe } = writable(startWith);
  //   return {
  //     subscribe,
  //     ref: null,
  //     id: "",
  //   };
  // }

  // Fallback for missing SDK
  if (!firestore) {
    // eslint-disable-next-line no-console
    console.warn('Firestore is not initialized. Are you missing FirebaseApp as a parent component?')
    return () => undefined
  }

  const docRef = typeof ref === 'string' ? doc(firestore, ref) : (ref as DocumentReference<T>)

  const signal = from<T>(set => {
    if (startWith) {
      set(() => startWith)
    }

    unsubscribe = onSnapshot(docRef as DocumentReference, snapshot => {
      const data = {
        id: snapshot.id,
        ref: snapshot.ref,
        ...(snapshot.data() as T),
      }

      set(() => data)
    })

    return unsubscribe
  })

  return signal
}

export const collectionPath = <Collections extends string>(base: Collections, id?: string) =>
  id ? `${base}/${id}` : base
export const documentPath = <Collections extends string>(base: Collections, id: string) =>
  `${base}/${id}`

export function filterRef<T>(
  firestore: Firestore,
  ref: ColRef<T>,
  compositeFilter: QueryCompositeFilterConstraint,
  ...queryConstraints: QueryNonFilterConstraint[]
): Query<T, DocumentData> {
  const collectionRef =
    typeof ref === 'string' ? collection(firestore, ref) : (ref as CollectionReference)
  return query(collectionRef, compositeFilter, ...queryConstraints) as Query<T, DocumentData>
}
