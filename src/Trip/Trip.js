import React from 'react';
import { Link } from 'react-router-dom'
import TripsContext from '../TripsContext'
import { findTrip } from '../trips-helper'
import './Trip.css'

export default class Trip extends React.Component 
{

   static contextType = TripsContext

    render () {
        
        const { id } = this.props.match.params
        const { store } = this.context

        const trip = findTrip(store, id)
        // console.log('storeee', store)
        // console.log('id', id)
        console.log('trippp', trip)

        return (
            <main className='trip-main'>
                <header>
                    <h1>{trip.name}</h1>
                </header>
                <section className='trip-flight-form'>
                    {/*this button is going to hide and show a form based off of state. will implement when I add interactivity.*/}
                    <h2>Flights</h2>
                    <button>Add a Flight</button>
                    <form>
                        <div className="form-section">
                            <label htmlFor="airline">Airline</label>
                            <input type="text" name="airline" />
                        </div>
                        <div className="form-section">
                            <label htmlFor="flight-num">Flight #</label>
                            <input type="number" name="flight-num" />
                        </div>
                        <div className="form-section">
                            <label htmlFor="depart-date">Departure Date</label>
                            <input type="date" name="depart-date" />
                        </div>
                        <div className="form-section">
                            <label htmlFor="depart-time">Departure Time</label>
                            <input type="time" name="depart-time" />
                        </div>
                        <div className="form-section">
                            <label htmlFor="seats">Seats</label>
                            <input type="number" name="seats" />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </section>
                <section className='trip-flight-list'>
                    <h3>Current Flights</h3>
                    <ol>
                        {trip.flights.map(flight => (
                            <div>
                                <li className='flight-results-list'>
                                    <strong>Flight : {flight.airline}</strong> 
                                </li>
                                <span>
                                    Departure Date : {flight.depart_date}
                                </span>
                                <div>
                                    <button>
                                        Edit
                                    </button>
                                    <button>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}                            
                    </ol>       
                </section>

            </main>
        )
    }
}