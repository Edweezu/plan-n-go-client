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
                            <div key={flight.id}>
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
                <section className='trip-destination-form'>
                    {/*this button is going to hide and show a form based off of state. will implement when I add interactivity.*/}
                    <h2>Activities / Destinations</h2>
                    <button>Add a Destination</button>
                    <form>
                        <div className="form-section">
                            <label htmlFor="destination">Destination Name</label>
                            <input type="text" name="destination" />
                        </div>
                        <div className="form-section">
                            <label htmlFor="date">Date</label>
                            <input type="date" name="date"/>
                        </div>
                        <div className="form-section">
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" />
                        </div>
                        <div className="form-section">
                            <label htmlFor="notes">Destination Notes</label>
                            <textarea rows="5" name="notes" ></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </section>
                <section className='trip-destination-list'>
                    <h3>Current Destinations</h3>
                    <ol>
                        {trip.destinations.map(destination => (
                            <div key={destination.id}>
                                <li className='flight-results-list'>
                                    <strong>Destination : {destination.name}</strong> 
                                </li>
                                <span>
                                     Activity Date : {destination.date}
                                </span>
                                <div>
                                    Address : {destination.Address}
                                </div>
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
                <section className='trip-packing-list'>
                    <h2>Packing List</h2>
                    <h3>
                        <input type="text" name="list-search" />
                        <button type="submit">Search</button>
                    </h3>
                    <div className='add-form-fields'>
                        <div>
                            <button>Add an Item</button>
                        </div>
                        <label htmlFor="add-item">Item Name</label>
                        <input type="text" name="add-item" />
                    </div>
                    <button type="submit">Submit</button>     
                </section>
                <section className='trip-packing-results'>
                <h3>Current Destinations</h3>
                    <ol>
                        {trip.list.map(item => (
                            <div key={item.id}>
                                <li className='flight-results-list'>
                                   {item.name}
                                </li>
                                <div>
                                    <button>
                                        Check 
                                    </button>
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