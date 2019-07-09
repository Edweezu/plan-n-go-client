import React from 'react'
import { Link } from 'react-router-dom'
import UsersApiService from '../services/users-api-service'

export default class CreateAccount extends React.Component {

   state = {
       error: null
   }

    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password } = e.target
        const newUser = {
            username: username.value.toLowerCase(),
            password: password.value
        }

        return UsersApiService.postUser (newUser)
            .then(responseJson => {
                username.value = ''
                password.value = ''
                this.handleRegistration()
            })
            .catch(responseJson => {
                this.setState({
                    error: responseJson.error
                })
            })
    }

    handleRegistration = () => {
        const { history } = this.props
        history.push('/login')
    }

    render () {
        const { error } = this.state
        return (
            <main className='RegisterPage'>
                <h2>
                    Create an Account
                </h2>
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
                            <input id='username' name='username' type='text'
                            required/>
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
                            <input id='password' name='password' type='password'
                            required/>
                        </div>
                    </div>
                    <div className='signup-element'>
                        <div className='signup-label'>
                            <label htmlFor='confirm-pw'>
                                Confirm Password    
                            </label>
                            <span className='astrik'>*</span>
                        </div>
                        <div className='signup-input'>
                            <input id='confirm-pw' name='confirm-pw' type='password' required/>
                        </div>
                    </div>
                    <div className='signin-button'>
                        <button className="btn btn-sign-in" type='submit'>
                            Create an Account
                        </button>
                    </div>
                    <div className='signup-demo'>
                        <p>Password must be longer than 8 characters and contain one upper case, lower case, number and special character.</p>
                    </div>
                    <div className='login-form-redirect'>
                        <Link to='/login'>Already have an Account?</Link>
                    </div>
                </form>
            </main>   
        )
    }  
}