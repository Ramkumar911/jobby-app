import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onLgout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-nav">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-log-size"
        />
      </Link>
      <div className="nav-items-cont">
        <Link to="/" className="link">
          <p className="nav-item">Home</p>
        </Link>
        <Link to="/jobs" className="link">
          <p className="nav-item">jobs</p>
        </Link>
      </div>
      <button type="button" className="log-out-but" onClick={onLgout}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
