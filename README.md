<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=SolidFire&background=tiles&project=%20" alt="solidfire">
</p>

# SolidFire

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

A minimal, yet powerful library that puts realtime Firebase data into Solid signals.

## ⚠️ Currently in Development 🛠️
I got the idea from [SvelteFire](https://github.com/codediodeio/sveltefire) to make this lib for a few side projects but I've only implemented what I needed so far. Right now I'm in the process of copying this over from the version implemented in my apps.

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
