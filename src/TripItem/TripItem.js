import React from 'react'
import TripsContext from '../TripsContext'
import { Link } from 'react-router-dom'
import Trip from '../Trip/Trip';
import config from '../config'
import TokenService from '../services/token-service'

class TripItem extends React.Component {
    static contextType = TripsContext

    state = {
        error: null
    }

    

    handleClickDelete = (e) => {
        e.preventDefault()
        const tripid = this.props.id

        console.log('propsss tripid', tripid)

        return fetch(`${config.API_ENDPOINT}/trips/${tripid}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => {
            console.log(' delete resss', res)
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            
            // return res.json()
        })
        .then(() => {
            console.log('hiiii')
            this.context.deleteTrip(tripid)
            // allow parent to perform extra behaviour
            // this.props.onDeleteNote(tripid)
            // this.props.history.push('/dashboard')
        })
        .catch(error => {
            this.setState({
                error: error
            })
        })
    }

    render () {
        const { id, name} = this.props
        return (
            <section className='trip-item'>
                <h2 className='Note__title'>
                    <Link to={"/trip" + id}>
                        {name}
                    </Link>
                </h2>
                <button 
                    className='trip-item-delete'
                    type='button'
                    onClick={this.handleClickDelete}
                >
                    Delete
                </button>
            </section>
        )
    }

}

export default TripItem