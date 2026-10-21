import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteNav } from './components/SiteNav'
import { CharactersPage } from './pages/CharactersPage'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <SiteNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
