import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link${isActive ? ' active' : ''}`

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              Octofit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navMenu"
              aria-controls="navMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navMenu">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/activities">
                    Activities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/leaderboard">
                    Leaderboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/teams">
                    Teams
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/users">
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/workouts">
                    Workouts
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
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
      <div className="alert alert-info mt-4">
        <p className="mb-1">
          This frontend is configured to use <code>VITE_CODESPACE_NAME</code> with the GitHub Codespaces URL pattern.
        </p>
        <p className="mb-0">
          Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to call the backend at <code>https://&lt;your-codespace-name&gt;-8000.app.github.dev/api/[component]/</code>.
        </p>
      </div>
    </div>
  )
}

export default App
