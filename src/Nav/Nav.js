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
              <div className='Header-in'>
                <h3>
                  <Link to='/dashboard'><i className="fas fa-plane"></i>
                      Plan-n-Go
                  </Link>
                </h3>
                <div className='Header-links'>
                  <Link
                    onClick={this.handleLogoutClick}
                    to='/'>
                    Logout
                  </Link>
                </div>          
              </div>
            )
          }
        
          renderLoginLink() {
            return (
              <div className='Header-not-in'>
                <h3>
                  <Link to ='/'><i className="fas fa-plane"></i>
                      Plan-n-Go
                  </Link>
                </h3>
                <div className='Header-links'>
                  <Link
                    to='/register'>
                    Create an Account
                  </Link>
                  <span className='Header-space'>  
                  </span>
                  <Link
                    to='/login'>
                    Login
                  </Link>
                </div>   
              </div>
            )
          }

          
        
    render () {
        return (
            <nav id="navbar" className='nav'>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()
                }
            </nav>   
        )
    }
}

export default Nav;