import React from 'react';
import { Link } from 'react-router-dom' 
import TripsContext from '../TripsContext'
import UsersApiService from '../services/users-api-service'
import TokenService from '../services/token-service'
// import config from '../config'

export default class LoginForm extends React.Component {

    static contextType = TripsContext

    

    constructor (props) {
        super (props)
        this.state = {
            error: null
        }
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
               TokenService.saveAuthToken(responseJson.authToken)
               this.context.loggedIn()
               console.log('authtokennnn', responseJson.authToken)
               this.props.onLoginSuccess()
            })
            .catch(responseJson => {
                this.setState({
                    error: responseJson.error
                })
            })

    }


    render () {
        const { error } = this.state
        return (
            <form className='login-form' onSubmit={this.handleSubmit}>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='signup-element'>
                    <label htmlFor='username'>
                        Username    
                    </label>
                    <input id='username' name='username' type='text' placeholder='demo' required/>
                </div>
                <div className='signup-element'>
                    <label htmlFor='password'>
                        Password    
                    </label>
                    <input id='password' name='password' type='password' placeholder='Testing123!' required/>
                </div>
                <div className='signin-button'>
                    {/* <Link to={`/dashboard`}>Sign in</Link> */}
                    <button type='submit'>
                        Sign In 
                    </button>
                </div>
                
                <div>
                    <Link to='/register'>Don't have an account? Create one.</Link>
                </div>
            </form>
        )
    }
}