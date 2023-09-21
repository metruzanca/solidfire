<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=SolidFire&background=tiles&project=%20" alt="solidfire">
</p>

# SolidFire 🔥

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

A minimal, yet powerful library that puts realtime Firebase data into Solid signals.

## ⚠️ Currently in Development 🛠️
I got the idea from [SvelteFire](https://github.com/codediodeio/sveltefire) to make this lib for a few side projects but I've only implemented what I needed so far. Right now I'm in the process of copying this over from the version implemented in my apps.

I've got a pretty good idea of where I want this project to go, heres the abbridged version: (_this is currently fictional_)

Using the `<FirebaseAppProvider>` component we pass `app={app}` and that gives us access to the firebaseApp context, which provides all solidfire signal functions access to firestore, storage, auth etc instances. (_alternatively store it on window.app etc???_)

The methods `fromCollection<Type>('collection')` and `fromDocument<Type>('collection/1')` provide signal that is derived [`from`](https://www.solidjs.com/docs/latest/api#from) a realtime snapshot of collections and documents respectively. When using these you'll always have the lastest version of collection/document.

The methods `createDocument`, `updateDocument`, `deleteDocument` provide C~~R~~UD for the documents. When we call these methods, our snapshots automatically update. They likely won't return the updated/created document since the whole point is to use the snapshots. _We've essentially got a one-way data binding that goes thru firebase._

This lbrary (initially) won't be providing a way to get documents without subscribing, since thats easily done. This library merely provides a way to integrate firebase snapshots into solid via signals. (A match made in heaven)

I will likely also create many of the things Jeff has created in his [SvelteFire](https://github.com/codediodeio/sveltefire), since this is inspired by it after all. It won't be a 1:1 since svelte can do some things solid can't, so I'll just be doing a _solid effort_ to make this have a solid-spin to it.

> _did you like my pun?_

See [Changelog](CHANGELOG.md) to keep an eye on the progress. Version 1.0.0 will come out once I have a feature set comparable to sveltefire + a solid spin on things.

## Quick start

Install it:

```bash
npm i solidfire
# or
yarn add solidfire
# or
pnpm add solidfire
```

Use it:

```tsx
import { fromCollection, fromDocument } from 'solidfire'

const memes = fromCollection<{ url: string; name: string }>('memes')

// in a component..
<For each={memes()}>
  {meme => (
    <img class="max-h-80" src={meme.url} alt={meme.name} />
  )}
</For>
```
