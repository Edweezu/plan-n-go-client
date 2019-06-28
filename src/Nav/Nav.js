import React from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import TripsContext from '../TripsContext';
import IdleService from '../services/idle-service'

class Nav extends React.Component {
    
        static contextType = TripsContext

        handleLogoutClick = () => {
            this.context.loggedOut()
            TokenService.clearAuthToken()
            TokenService.clearCallbackBeforeExpiry()
            IdleService.unRegisterIdleResets()
        }

        renderLogoutLink() {
            return (
              <div className='Header__logged-in'>
                <Link to='/dashboard'>
                    Plan-n-Go
                </Link>
                {' '}
                <Link
                  onClick={this.handleLogoutClick}
                  to='/'>
                  Logout
                </Link>
              </div>
            )
          }
        
          renderLoginLink() {
            return (
              <div className='Header__not-logged-in'>
                <Link to ='/'>
                    Plan-n-Go
                </Link>
                {' '}
                <Link
                  to='/register'>
                  Create an Account
                </Link>
                {' '}
                <Link
                  to='/login'>
                  Log in
                </Link>
              </div>
            )
          }

        
    render () {
        // console.log('tokennn', TokenService.hasAuthToken())
        // console.log('contexttt', this.context)


        // const { login } = this.context
        return (
            <nav className='nav'>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()
                }
            </nav>   
        )
    }
}

export default Nav;