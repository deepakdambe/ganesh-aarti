import { NotesGrid } from './components/NotesGrid'
import { sampleNotes } from './types/Note'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>गणपती आरती</h1>
      </header>
      <main>
        <NotesGrid notes={sampleNotes} />
      </main>
    </div>
  )
}

export default App
