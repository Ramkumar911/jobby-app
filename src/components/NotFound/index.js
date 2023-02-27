import './index.css'
import Header from '../Header'

const NotFound = () => (
  <div className="not-found-header">
    <Header />
    <div className="not-found-cont">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
        />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found</p>
      </div>
    </div>
  </div>
)
export default NotFound
