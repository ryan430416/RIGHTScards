import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteNav } from './components/SiteNav'
import { CharactersPage } from './pages/CharactersPage'
import { HomePage } from './pages/HomePage'
import { MissionPage } from './pages/MissionPage'

function AppShell() {
  const location = useLocation()
  const isMissionPage = location.pathname.startsWith('/mission/')

  return (
    <div className="app-shell">
      {isMissionPage ? null : <SiteNav />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/mission/:caseId" element={<MissionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
