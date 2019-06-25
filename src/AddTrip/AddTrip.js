import React from 'react';
import { Link } from 'react-router-dom'
import config from '../config'
import TokenService from '../services/token-service'

export default class AddTrip extends React.Component {

    state = {
        error: null
    }

    handleAddTrip = (e) => {
        e.preventDefault()

        const { city, trip_name, start_date, end_date, notes } = e.target

        const newTrip = {
            city: city.value,
            trip_name: trip_name.value,
            start_date: start_date.value,
            end_date: end_date.value,
            notes: notes.value
        }
        console.log('new trippp', newTrip)
        return fetch(`${config.API_ENDPOINT}/trip`, {
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newTrip)
        })
        .then(res => {
            console.log('server responseee', res)
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(trip => {
            
        })
        .catch(error => {
            this.setState({
                error
            })
        })
    }



    render () {
        return (
            <main className='add-trip'>
                <h2>Add a Trip</h2>
                <p>Add a trip by simply entering in your destination city and your desired dates.</p>
                <form onSubmit={this.handleAddTrip}>
                    <div className='signup-element'>
                        <label htmlFor='city'>
                            Destination City*  
                        </label>
                        <input id='city' name='city' type='text'/>
                    </div>
                    <div className='signup-element'>
                        <label htmlFor='trip-name'>
                            Trip Name    
                        </label>
                        <input id='trip_name' name='trip_name' type='text'/>
                    </div>
                    <div className='signup-element'>
                        <label htmlFor='start-date'>
                            Start Date*   
                        </label>
                        <input id='start_date' name='start_date' type='date'/>
                    </div>
                    <div className='signup-element'>
                        <label htmlFor='end-date'>
                            End Date* 
                        </label>
                        <input id='end_date' name='end_date' type='date'/>
                    </div>
                    <div className='signup-element'>
                        <label htmlFor='notes'>
                            Trip Notes   
                        </label>
                        <textarea id='notes' name='notes' rows='5'/>
                    </div>
                    <div className='add-trip-button'>
                        <button type='submit'>
                            Add Trip
                        </button>
                        <Link to ='/dashboard'>Add Trip</Link>
                    </div>
                    <div>
                        <Link to ='/dashboard'>Cancel</Link>
                    </div>
                </form>
            </main>
        )
    }
}