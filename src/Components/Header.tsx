import * as React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => (
  <div className="container-fluid">
    <div className="row">
      <nav className="col navbar navbar-expand navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Todo List App
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/history" className="nav-link">
                History
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/statistics" className="nav-link">
                Statistics
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
)

export default Header
