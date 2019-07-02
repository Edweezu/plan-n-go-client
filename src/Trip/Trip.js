import React from 'react';
import TripsContext from '../TripsContext'
import { findTrip } from '../trips-helper'
import TokenService from '../services/token-service'
import config from '../config'
import { format } from 'date-fns'
import FlightForm from '../FlightForm/FlightForm'
import UpdateFlightForm from '../UpdateFlightForm/UpdateFlightForm'
import DestinationForm from '../DestinationForm/DestinationForm'
import UpdateDestinationForm from '../UpdateDestinationForm/UpdateDestinationForm';
import PackingListForm from '../PackingListForm/PackingListForm'
import UpdatePackingListForm from '../UpdatePackingListForm/UpdatePackingListForm'
import UpdateTripForm from '../UpdateTripForm/UpdateTripForm'



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

    redirectDashboard = () => {
        this.props.history.push('/dashboard')
    }


    render () {
        
        const { id } = this.props.match.params
        const { flights=[], tripList=[], destinations=[], packing_list=[] } = this.context

        const trip = findTrip(tripList, id)
        // console.log('trippp', trip)

        return (
            <main className='trip-main'>
                <header>
                    <h1>{trip.length === 0 ? trip.trip_name : trip[0].trip_name}</h1>
                    <h3>
                        {trip.length === 0 ? trip.start_date : format(trip[0].start_date, 'MM-DD-YYYY') + ' to ' + format(trip[0].end_date, 'MM-DD-YYYY')}
                    </h3>
                    <UpdateTripForm
                        tripid={id}
                        redirectDashboard={this.redirectDashboard}
                    />
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
                                    Departure Date : {format(flight.depart_date, 'MM-DD-YYYY')}
                                </span>
                                <div>
                                    Notes : {flight.flight_notes}
                                </div>
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
                <section className='trip-destination-list'>
                    <h3>Current Destinations</h3>
                    <ol>
                        {destinations.map(destination => (
                            <div key={destination.id}>
                                <li className='flight-results-list'>
                                    <strong>Destination : {destination.destination_name}</strong> 
                                </li>
                                <span>
                                     Activity Date : {format(destination.destination_date, 'MM-DD-YYYY')}
                                </span>
                                <div>
                                    Address : {destination.address}
                                </div>
                                <div>
                                    Notes : {destination.destination_notes}
                                </div>
                                <UpdateDestinationForm 
                                    tripid={id}
                                    destinationid={destination.id}
                                />  
                            </div>
                        ))}                         
                    </ol>       
                </section>
                <section className='trip-packing-list'>
                    <h2>Packing List</h2>
                    {/* <h3>
                        <input type="text" name="list-search" />
                        <button type="submit">Search</button>
                    </h3> */}
                    <PackingListForm
                        tripid={id}
                    />   
                </section>
                <section className='trip-packing-results'>
                    <ol>
                        {packing_list.map(item => (
                            <div key={item.id}>
                                <li className='flight-results-list' 
                                    style={{
                                        textDecoration : item.checked === true ? 'line-through' : 'none' 
                                    }}
                                >
                                    {item.item_name}  
                                </li>
                                <div>
                                    Notes: {item.list_notes}
                                </div>
                                <button onClick={() => this.context.handleCheckItem(item.id)}>
                                    Check / Uncheck
                                </button>
                                <UpdatePackingListForm
                                    tripid={id}
                                    itemid={item.id}
                                />
                            </div>
                        ))}                            
                    </ol>       
                </section>
                <section>
                    <button onClick={this.redirectDashboard}>
                        Back to Dashboard
                    </button>
                </section>
            </main>
        )
    }
}