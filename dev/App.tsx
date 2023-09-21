import { For, type Component } from 'solid-js'
import logo from './logo.svg'
import { firestore } from './firebase'
// SolidFire imports
import { fromCollection } from '../src'
// import { collectionPath } from 'src/signals'

type Meme = {
  name: string
  url: string
}

const App: Component = () => {
  const data = fromCollection<Meme>(firestore, 'memes')

  return (
    <div class="bg-gray-900 h-screen">
      {/* <img src={logo} alt="logo" /> */}
      <h1 class="text-white text-2xl">Have some memes</h1>
      <ol>
        <For each={data()}>
          {meme => (
            <li>
              <h2 class="text-white" textContent={meme.name} />
              <img class="max-h-80" src={meme.url} alt={meme.name} />
            </li>
          )}
        </For>
      </ol>
    </div>
  )
}

export default App
