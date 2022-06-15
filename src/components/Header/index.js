import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
      </Link>

      <ul className="header-lg-buttons-container">
        <Link to="/" className="header-menu-link-tag">
          <li>
            <p className="header-lg-buttons">Home</p>
          </li>
        </Link>
        <Link to="/jobs" className="header-menu-link-tag">
          <li>
            <p className="header-lg-buttons">Jobs</p>
          </li>
        </Link>
      </ul>

      <ul className="header-icons-container">
        <Link to="/">
          <li>
            <button type="button" className="nav-button">
              <AiFillHome className="header-icons" />
            </button>
          </li>
        </Link>
        <Link to="/jobs">
          <li>
            <button type="button" className="nav-button">
              <BsFillBriefcaseFill className="header-icons" />
            </button>
          </li>
        </Link>
        <li>
          <button type="button" className="nav-button" onClick={onLogout}>
            <FiLogOut className="header-icons" />
          </button>
        </li>
      </ul>
      <button type="button" className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
