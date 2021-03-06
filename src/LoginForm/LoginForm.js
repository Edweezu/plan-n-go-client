import React from 'react';
import { Link } from 'react-router-dom' 
import TripsContext from '../TripsContext'
import UsersApiService from '../services/users-api-service'
// import TokenService from '../services/token-service'
// import config from '../config'

export default class LoginForm extends React.Component {

    static contextType = TripsContext

    state = {
        error: null,
        password: 'Testing123!',
        username: 'demo'
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            error: null
        })

        const { username, password} = e.target

        return UsersApiService.postLogin({
            username: username.value,
            password: password.value
        })
            .then(responseJson => {
               username.value = ''
               password.value = ''
               this.context.loggedIn()
               this.props.onLoginSuccess()
            })
            .catch(responseJson => {
                this.setState({
                    error: responseJson.error
                })
            })
    }

    handleChangeUser = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }



    render () {
        const { error, username, password } = this.state
        return (
            <form className='login-form' onSubmit={this.handleSubmit}>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='signup-element'>
                    <div className='signup-label'>
                        <label htmlFor='username'>
                            Username    
                        </label>
                        <span className='astrik'>
                            *
                        </span>
                    </div>
                    <div className='signup-input'>
                        <input id='username' name='username' type='text' placeholder='demo' value={username} onChange={this.handleChangeUser} required/>
                    </div>
                    
                </div>
                <div className='signup-element'>
                    <div className='signup-label'>
                        <label htmlFor='password'>
                            Password    
                        </label>
                        <span className='astrik'>*</span>
                    </div>
                    <div className='signup-input'>
                        <input id='password' name='password' type='password' placeholder='Testing123!' value={password} onChange={this.handleChangePassword} required/>
                    </div> 
                </div>
                <div className='signin-button'>
                    <button className="btn btn-sign-in" type='submit'>
                        Sign In 
                    </button>
                </div>
                <div className='login-demo'>
                    <h4>Demo Account</h4>
                    <p>Username: demo</p>
                    <p>Password: Testing123!</p>
                </div>
                <div className='login-form-redirect'>
                    <Link to='/register'>Don't have an account? Create one.</Link>
                </div>
            </form>
        )
    }
}