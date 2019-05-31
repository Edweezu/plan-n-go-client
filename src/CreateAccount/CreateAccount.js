import React from 'react'
import { Link } from 'react-router-dom'

export default function CreateAccount(props) {
    return (
        <form className='signup-form'>
            <div className='signup-element'>
                <label for='username'>
                    Username    
                </label>
                <input id='username' name='username' type='text'/>
            </div>
            <div className='signup-element'>
                <label for='password'>
                    Password    
                </label>
                <input id='password' name='password' type='text'/>
            </div>
            <div className='signup-element'>
                <label for='confirm-pw'>
                    Confirm Password    
                </label>
                <input id='confirm-pw' name='confirm-pw' type='text'/>
            </div>
            <div className='signup-button'>
                <button type='submit'>Create an Account</button>
            </div>
            <div>
                Already have an Account? <span><Link to='/login'>Login</Link></span>
            </div>
        </form>
    )
}