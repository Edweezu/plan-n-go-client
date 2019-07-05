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
    const { location, history } = this.props
    const destination = (location.state || {}).from ||'/dashboard'
   
    history.push(destination)
  }

  render() {
    console.log('hi')
    return (
      <main className='LoginPage'>
        {/* {this.context.expired ? this.props.history.push('/login') : null} */}
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </main>
    )
  }
}