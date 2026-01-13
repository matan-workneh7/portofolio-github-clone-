import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Repository from './pages/Repository';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Issue from './pages/Issue';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repositories/:id" element={<Repository />} />
          <Route path="/users/:username" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/repositories/:repoId/issues/:issueId" element={<Issue />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
