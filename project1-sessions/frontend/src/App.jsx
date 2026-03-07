import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateSessionPage from './pages/CreateSessionPage'
import JoinSessionPage from './pages/JoinSessionPage'
import SessionDashboardPage from './pages/SessionDashboardPage'
import AdminPanelPage from './pages/AdminPanelPage'

function App() {
  return (
    <div className="min-h-screen bg-cyber-darker">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateSessionPage />} />
        <Route path="/join" element={<JoinSessionPage />} />
        <Route path="/session/:code" element={<SessionDashboardPage />} />
        <Route path="/admin/:code" element={<AdminPanelPage />} />
      </Routes>
    </div>
  )
}

export default App
