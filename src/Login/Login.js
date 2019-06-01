import React from 'react';
import { Link } from 'react-router-dom'

export default class Login extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault()

    }



    render () {
        return (
            <form className='login-form' onSubmit={this.handleSubmit}>
                <div className='signup-element'>
                    <label htmlFor='username'>
                        Username    
                    </label>
                    <input id='username' name='username' type='text' placeholder='demo'/>
                </div>
                <div className='signup-element'>
                    <label htmlFor='password'>
                        Password    
                    </label>
                    <input id='password' name='password' type='text' placeholder='Testing123'/>
                </div>
                <div className='signin-button'>
                    <Link to='/dashboard'>Sign in</Link>
                    {/* <button type='submit'>Sign In </button> */}
                </div>
                <div>
                    <Link to='/register'>Don't have an account? Create one.</Link>
                </div>
            </form>
        )
    }
}