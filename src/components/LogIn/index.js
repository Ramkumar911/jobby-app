import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class LogIn extends Component {
  state = {userInput: '', passwordInput: '', errorMessage: '', isError: false}

  changeUsername = event => {
    this.setState({userInput: event.target.value})
  }

  changePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  apiStatusSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  apiStatusFailure = errorMsg => {
    this.setState({errorMessage: errorMsg, isError: true})
  }

  getLogin = async event => {
    event.preventDefault()
    const {userInput, passwordInput} = this.state
    // console.log(userInput, passwordInput)
    const userDetails = {username: userInput, password: passwordInput}
    // console.log(userDetails)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    console.log(data)
    if (response.ok === true) {
      this.apiStatusSuccess(data.jwt_token)
    } else {
      this.apiStatusFailure(data.error_msg)
    }
  }

  render() {
    const {userInput, passwordInput, isError, errorMessage} = this.state
    // console.log(passwordInput)
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-bg-log">
        <div className="log-bg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="web-log-img-size"
          />
          <form onSubmit={this.getLogin}>
            <div className="input-label-user-cont">
              <label htmlFor="userName" className="label-name">
                USERNAME
              </label>
              <br />
              <input
                type="text"
                id="userName"
                className="input-name"
                placeholder="Username"
                onChange={this.changeUsername}
                value={userInput}
              />
            </div>
            <div className="input-label-user-cont">
              <label htmlFor="password" className="label-name">
                PASSWORD
              </label>
              <br />
              <input
                type="password"
                id="password"
                className="input-name"
                placeholder="Password"
                value={passwordInput}
                onChange={this.changePassword}
              />
            </div>
            <button type="submit" className="login-but">
              Login
            </button>
            {isError && <p className="error-msg">*{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LogIn
