import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Octofit Tracker
            </a>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  )
}

function HomePage() {
  return (
    <div className="container mt-5">
      <h1>Welcome to Octofit Tracker</h1>
      <p>Your personal fitness tracking application</p>
    </div>
  )
}

export default App
