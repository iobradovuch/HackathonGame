import { Routes, Route } from 'react-router-dom'
import CardsPage from './pages/CardsPage'
import RandomizerPage from './pages/RandomizerPage'
import HistoryPage from './pages/HistoryPage'
import AdminCardsPage from './pages/AdminCardsPage'

function App() {
  return (
    <div className="min-h-screen bg-cyber-darker">
      <Routes>
        <Route path="/" element={<CardsPage />} />
        <Route path="/randomizer" element={<RandomizerPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/admin" element={<AdminCardsPage />} />
      </Routes>
    </div>
  )
}

export default App
