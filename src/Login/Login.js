import React from 'react';
import { Link } from 'react-router-dom'
import{ getUserFromUserName } from '../trips-helper'

export default class Login extends React.Component {

    // static contextType = TripsContext
    // handleSubmit = (e) => {
    //     e.preventDefault()

    // }

    state = {
        username: ''
    }

    changeUsername = (username) => {
        this.setState({
            username
        })
    }


    render () {

        const { username } = this.state
        console.log('usernameeee', username)

        return (
            <form className='login-form' onSubmit={this.handleSubmit}>
                <div className='signup-element'>
                    <label htmlFor='username'>
                        Username    
                    </label>
                    <input id='username' name='username' type='text' placeholder='demo' onChange={(e) => this.changeUsername(e.target.value)}/>
                </div>
                <div className='signup-element'>
                    <label htmlFor='password'>
                        Password    
                    </label>
                    <input id='password' name='password' type='password' placeholder='Testing123'/>
                </div>
                <div className='signin-button'>
                    <Link to={`/dashboard/${username}`}>Sign in</Link>
                    {/* <button type='submit'>Sign In </button> */}
                </div>
                <div>
                    <Link to='/register'>Don't have an account? Create one.</Link>
                </div>
            </form>
        )
    }
}