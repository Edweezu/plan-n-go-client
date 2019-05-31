import React from 'react'
import { Link } from 'react-router-dom'


class Nav extends React.Component {
    render () {
        return (
            <nav className='nav'>
                <Link to="/">Home</Link>
                {' '}
                <Link to="/register">Create an Account</Link>
                {' '}
                <Link to="/login">Log In</Link>
            </nav>   
        )
    }
}

export default Nav;