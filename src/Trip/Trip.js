import React from 'react';
import { Link } from 'react-router-dom'
import TripsContext from '../TripsContext'
import { findTrip } from '../trips-helper'
import './Trip.css'
import TokenService from '../services/token-service'
import config from '../config'
import { format } from 'date-fns'
import FlightForm from '../FlightForm/FlightForm'
import UpdateFlightForm from '../UpdateFlightForm/UpdateFlightForm'
import DestinationForm from '../DestinationForm/DestinationForm'

export default class Trip extends React.Component 
{

   static contextType = TripsContext

   componentDidMount() {
    const tripid = this.props.match.params

    Promise.all([
        fetch(`${config.API_ENDPOINT}/trips`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
          }
        }), 

        fetch(`${config.API_ENDPOINT}/trips/${tripid.id}/flights`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
          }
        }), 

        fetch(`${config.API_ENDPOINT}/trips/${tripid.id}/destinations`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
          }
        }), 

        fetch(`${config.API_ENDPOINT}/trips/${tripid.id}/packing_list`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
          }
        }), 
      ])
      .then(([tripRes, flightRes, destinationRes, listRes]) => {
            if (!tripRes.ok)
                return tripRes.json().then(e => Promise.reject(e))
            if (!flightRes.ok)
                return flightRes.json().then(e => Promise.reject(e))
            if (!destinationRes.ok)
                return destinationRes.json().then(e => Promise.reject(e))
            if (!listRes.ok)
                return listRes.json().then(e => Promise.reject(e))
            
            return Promise.all([
                tripRes.json(),
                flightRes.json(),
                destinationRes.json(),
                listRes.json(),
            ])
      })
      .then(([tripList, flights, destinations, packing_list]) => {
        this.context.setTripList(tripList)
        this.context.setFlights(flights)
        this.context.setDestinations(destinations)
        this.context.setList(packing_list)
      })
      .catch(error => {
          console.error({
              error
          })
      })
   }


    render () {
        
        const { id } = this.props.match.params
        const { flights=[], tripList=[], destinations=[], packing_list=[] } = this.context

        const trip = findTrip(tripList, id)
        console.log('trippp', trip)

        return (
            <main className='trip-main'>
                <header>
                    <h1>{trip.length === 0 ? trip.trip_name : trip[0].trip_name}</h1>
                </header>
                <FlightForm 
                    tripid={id}
                />
                <section className='trip-flight-list'>
                    <h3>Current Flights</h3>
                    <ol>
                        {flights.map(flight => (
                            <div key={flight.id}>
                                <li className='flight-results-list'>
                                    <strong>Flight : {flight.airline}</strong> 
                                </li>
                                <span>
                                    Departure Date : {format(flight.depart_date, 'YYYY-MM-DD')}
                                </span>
                                <UpdateFlightForm 
                                    tripid={id}
                                    flightid={flight.id}
                                />
                            </div>
                        ))}                         
                    </ol>       
                </section>
                <DestinationForm 
                    tripid={id}
                />
                {/* <section className='trip-destination-form'>
                    <h2>Activities / Destinations</h2>
                    <button>Add a Destination</button>
                    <form>
                        <div className="form-section">
                            <label htmlFor="destination_name">Destination Name</label>
                            <input type="text" name="destination_name" id="destination_name"/>
                        </div>
                        <div className="form-section">
                            <label htmlFor="destination_date">Date</label>
                            <input type="destination_date" name="date" id="destination_date"/>
                        </div>
                        <div className="form-section">
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" id="address"/>
                        </div>
                        <div className="form-section">
                            <label htmlFor="destination_notes">Destination Notes</label>
                            <textarea rows="5" name="destination_notes" id="destination_notes"></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </section> */}
                <section className='trip-destination-list'>
                    <h3>Current Destinations</h3>
                    <ol>
                        {destinations.map(destination => (
                            <div key={destination.id}>
                                <li className='flight-results-list'>
                                    <strong>Destination : {destination.destination_name}</strong> 
                                </li>
                                <span>
                                     Activity Date : {format(destination.destination_date, 'YYYY-MM-DD')}
                                </span>
                                <div>
                                    Address : {destination.address}
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
                        
                    </div>
                    <div className="form-section">
                    <label htmlFor="add-item">Item Name</label>
                        <input type="text" name="add-item" />
                    </div>
                    <div className="form-section">
                            <label htmlFor="list_notes">Item Notes</label>
                            <textarea rows="5" name="list_notes" id="list_notes"></textarea>
                    </div>
                    <button type="submit">Submit</button>     
                </section>
                <section className='trip-packing-results'>
                <h3>Packing List</h3>
                    <ol>
                        {packing_list.map(item => (
                            <div key={item.id}>
                                <li className='flight-results-list'>
                                   {item.item_name}
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