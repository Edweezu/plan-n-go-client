import React from 'react'
import { Link } from 'react-router-dom'

export default function CreateAccount(props) {
    return (
        <form className='signup-form'>
            <div className='signup-element'>
                <label htmlFor='username'>
                    Username    
                </label>
                <input id='username' name='username' type='text'/>
            </div>
            <div className='signup-element'>
                <label htmlFor='password'>
                    Password    
                </label>
                <input id='password' name='password' type='password'/>
            </div>
            <div className='signup-element'>
                <label htmlFor='confirm-pw'>
                    Confirm Password    
                </label>
                <input id='confirm-pw' name='confirm-pw' type='password'/>
            </div>
            <div className='signup-button'>
                {/* <button type='submit'>Create an Account</button> */}
                <Link to='/dashboard'>Create an Account</Link>
            </div>
            <div>
                {/* Already have an Account? <span><Link to='/login'>Login</Link></span> */}
                <Link to='/login'>Already have an Account?</Link>
            </div>
        </form>
    )
}