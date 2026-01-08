import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Home } from '@/pages/Home'
import { RepositoryPage } from '@/pages/Repository'
import { Profile } from '@/pages/Profile'
import { Search } from '@/pages/Search'
import { IssuePage } from '@/pages/Issue'
import { NewRepository } from '@/pages/NewRepository'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Header />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repos/:id" element={<RepositoryPage />} />
            <Route path="/repos/:id/issues/:issueId" element={<IssuePage />} />
            <Route path="/users/:username" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/new" element={<NewRepository />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
