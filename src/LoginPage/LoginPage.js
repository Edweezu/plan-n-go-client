import React, { Component } from 'react'
import LoginForm from '../LoginForm/LoginForm'


export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { history } = this.props
    const destination = '/dashboard'
   
    history.push(destination)
  }

  render() {
    return (
      <main className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </main>
    )
  }
}