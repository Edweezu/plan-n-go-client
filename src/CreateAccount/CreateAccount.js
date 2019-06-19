import React from 'react'
import { Link } from 'react-router-dom'
import UsersApiService from '../services/users-api-service'

export default class CreateAccount extends React.Component {

    constructor (props) {
        super (props)
        this.state = {
            error: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password } = e.target
        const newUser = {
            username: username.value,
            password: password.value
        }

        return UsersApiService.postUser (newUser)
            .then(responseJson => {
                username.value = ''
                password.value = ''
                this.handleRegistration()
                console.log('user created')
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
            <form className='signup-form' onSubmit={this.handleSubmit}>
                 <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='signup-element'>
                    <label htmlFor='username'>
                        Username    
                    </label>
                    <input id='username' name='username' type='text'
                    required/>
                </div>
                <div className='signup-element'>
                    <label htmlFor='password'>
                        Password    
                    </label>
                    <input id='password' name='password' type='password'
                    required/>
                </div>
                <div className='signup-element'>
                    <label htmlFor='confirm-pw'>
                        Confirm Password    
                    </label>
                    <input id='confirm-pw' name='confirm-pw' type='password' required/>
                </div>
                <div className='signup-button'>
                    <button type='submit'>
                        Create an Account
                    </button>
                    {/* <Link to='/dashboard'>Create an Account</Link> */}
                </div>
                <div>
                    <Link to='/login'>Already have an Account?</Link>
                </div>
            </form>
        )
    }  
}