import BottomNav from './components/common/BottomNav'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <main className="app">
        <section className="app-content">
        </section>

        <BottomNav />
      </main>
    </div>
  )
}

export default App