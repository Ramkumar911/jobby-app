import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

class Home extends Component {
  /* findJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  } */

  render() {
    return (
      <div className="home-bg">
        <Header />
        <div className="find-mill-cont">
          <h1 className="find-the">
            Find The Job That <br />
            Fits Your Life
          </h1>
          <p className="millions">
            Millions of people are searching for jobs,salary <br />
            information,company reviews. Find the job that fits your <br />
            abilities and potential
          </p>
          <Link to="/jobs">
            <button type="button" className="find-jobs">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
