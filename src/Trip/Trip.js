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


export default class Trip extends React.Component {

   static contextType = TripsContext

    state = {
        error: null
    }

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
         this.setState({
             error
         })
      })
    }

    redirectDashboard = () => {
        this.props.history.push('/dashboard')
    }

    formatSpecificDate = (date) => {
        let [ year, month, day ] = date.substr(0, 10).split('-')
        return format(new Date(
                year,
                (month - 1),
                day,
        ), 'MM-DD-YYYY')
    }

    render () {
        const { id } = this.props.match.params
        const { flights=[], tripList=[], destinations=[], packing_list=[] } = this.context
        const { error } = this.state
        const trip = findTrip(tripList, id)

        return (
            <main id="main-top" className='trip-main'>
                <ul>
                    {error ? <p className='error'><strong>Error! You have been logged out. Please log back in to continue.</strong></p>
                    : ''}
                    {error ? alert('Error! You have been logged out. Please log back in to continue.')
                    : ''}
                </ul>
                <UpdateTripForm
                    trip={trip}
                    tripid={id}
                    redirectDashboard={this.redirectDashboard}
                />
                <section className='trip-descript-container'>
                    <section className='flights landing-descript-one'>
                        <FlightForm 
                            tripid={id}
                        />
                        <section className='trip-flight-list '>
                            <ol>
                                {flights.map(flight => (
                                    <div className='list-section 'key={flight.id}>
                                        <li className='flight-results-list'>
                                            <strong> {flight.airline}</strong> 
                                        </li>
                                        <div className={'list-info-div ' +  (!flight.flight_num ? 'hidden' : '') }>
                                            <span className='trip-details-title'>Flight #</span><i className="fas fa-caret-right"></i><span className='trip-details'>{flight.flight_num}</span> 
                                        </div>
                                    <div className={'list-info-div ' +  (!flight.depart_date ? 'hidden' : '') }>
                                            <span className='trip-details-title'>
                                                Departure Date
                                            </span>
                                            <i className="fas fa-caret-right"></i>
                                            <span className='trip-details'>
                                                {this.formatSpecificDate(flight.depart_date)}
                                            </span>
                                        </div>
                                        <div className={'list-info-div ' +  (!flight.depart_time ? 'hidden' : '') }>
                                            <span className='trip-details-title'>
                                                Departure Time
                                            </span>
                                            <i className="fas fa-caret-right"></i>
                                            <span className='trip-details'>
                                                {flight.depart_time}
                                            </span>  
                                        </div>
                                        <div className={'list-info-div ' +  (!flight.seats ? 'hidden' : '') }>
                                            <span className='trip-details-title'>
                                                Seats
                                            </span>
                                            <i className="fas fa-caret-right"></i>
                                            <span className='trip-details'>
                                                {flight.seats}
                                            </span>  
                                        </div>
                                        <div className={'list-info-div ' +  (!flight.flight_notes ? 'hidden' : '') }>
                                            <span className='trip-details-title'>
                                                Notes
                                            </span>
                                            <i className="fas fa-caret-right"></i>
                                            <span className='trip-details'>
                                                {flight.flight_notes}
                                            </span> 
                                        </div>
                                        <UpdateFlightForm 
                                            tripid={id}
                                            flightid={flight.id}
                                        />
                                    </div>
                                ))}                         
                            </ol>       
                        </section>
                    </section>
                    <section className='destinations landing-descript-two'>
                        <DestinationForm 
                            tripid={id}
                        />
                        <section className='trip-destination-list'>
                            <ol>
                                {destinations.map(destination => (
                                    <div className='list-section'key={destination.id}>
                                        <li className='flight-results-list'>
                                            <strong> {destination.destination_name}</strong> 
                                        </li>
                                        <div className={'list-info-div ' +  (!destination.destination_date ? 'hidden' : '') }>
                                            <span className='trip-details-title'>
                                                Date
                                            </span>
                                            <i className="fas fa-caret-right"></i>
                                            <span className='trip-details'>
                                                {this.formatSpecificDate(destination.destination_date)}
                                            </span>
                                        </div>
                                        <div className={'list-info-div ' +  (!destination.address ? 'hidden' : '') }>
                                            <span className='trip-details-title'>
                                                Address
                                            </span>
                                            <i className="fas fa-caret-right"></i>
                                            <span className='trip-details'>
                                                {destination.address}
                                            </span>
                                        </div>
                                        <div className={'list-info-div ' +  (!destination.destination_notes ? 'hidden' : '') }>
                                            <span className='trip-details-title'>
                                                Notes
                                            </span>
                                            <i className="fas fa-caret-right"></i>
                                            <span className='trip-details'>
                                                {destination.destination_notes}
                                            </span>
                                        </div>
                                        <UpdateDestinationForm 
                                            tripid={id}
                                            destinationid={destination.id}
                                        />  
                                    </div>
                                ))}                         
                            </ol>       
                        </section>                
                    </section>
                    <section className='packing-lists landing-descript-two'>
                        <section className='trip-packing-list'>
                            <PackingListForm
                                tripid={id}
                            />   
                        </section>
                        <section className='trip-packing-results'>
                            <ol>
                                {packing_list.map(item => (
                                    <div className='list-section'key={item.id}>
                                        <li className='flight-results-list' 
                                            style={{
                                                textDecoration : item.checked === true ? 'line-through' : 'none',
                                                textDecorationColor: item.checked === true ? 'black' : 'none'
                                            }}
                                        >
                                            <strong>{item.item_name}</strong>  
                                        </li>
                                        <div className={'list-info-div ' +  (!item.list_notes ? 'hidden' : '') }>
                                            <span className='trip-details-title'>
                                                Notes
                                            </span>
                                            <i className="fas fa-caret-right"></i>
                                            <span className='trip-details'>
                                                {item.list_notes}
                                            </span> 
                                        </div>
                                        <UpdatePackingListForm
                                            tripid={id}
                                            itemid={item.id}
                                        />
                                    </div>
                                ))}                            
                            </ol>       
                        </section>                  
                    </section>
                </section>   
                <section className='back-dash-btn'>
                    <button onClick={this.redirectDashboard}>
                        Back to Dashboard
                    </button>
                </section>
                <div className='scroll-up-div'>
                    <a href="#main-top">
                       <i className="fa fa-chevron-up"></i>          
                    </a>                   
                </div>
            </main>
        )
    }
}