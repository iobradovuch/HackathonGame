import { Routes, Route, Link, useLocation } from 'react-router-dom'
import LeaderboardPage from './pages/LeaderboardPage'
import TeamScorePage from './pages/TeamScorePage'
import FormsPage from './pages/FormsPage'
import ProblemCanvasPage from './pages/ProblemCanvasPage'
import Crazy8sPage from './pages/Crazy8sPage'
import AdminScoresPage from './pages/AdminScoresPage'
import ReportPage from './pages/ReportPage'

const navItems = [
  { path: '/', label: '🏆 Лідерборд' },
  { path: '/forms', label: '📝 Форми' },
  { path: '/admin', label: '⚙️ Адмін' },
  { path: '/report', label: '📊 Звіт' },
]

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-cyber-darker">
      <nav className="bg-cyber-dark/80 backdrop-blur border-b border-cyber-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-cyber text-neon-cyan text-lg tracking-wider">
              SCORES & FORMS
            </Link>
            <div className="flex gap-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<LeaderboardPage />} />
          <Route path="/team/:sessionId/:teamId" element={<TeamScorePage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/forms/canvas/:sessionId/:teamId" element={<ProblemCanvasPage />} />
          <Route path="/forms/crazy8s/:sessionId/:teamId" element={<Crazy8sPage />} />
          <Route path="/admin" element={<AdminScoresPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </main>
    </div>
  )
}
