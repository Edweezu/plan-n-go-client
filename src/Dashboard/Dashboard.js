import React from 'react'
import TripsContext from '../TripsContext'
import { Link } from 'react-router-dom'
// import Trip from '../Trip/Trip'
import TripApiService from '../services/trip-api-service'
import TripItem from '../TripItem/TripItem'

export default class Dashboard extends React.Component {

    static contextType = TripsContext

    state = {
        error: null,
    }
    
    componentDidMount() {
        TripApiService.getTrips()
            .then(trips => this.context.setTripList(trips))
            .catch(err => this.setError(err))
    }

    

    setError = (error) => {
        this.setState({
          error
        })
    }

    renderTrips() {
        const { tripList } = this.context
        console.log('triplisttt', tripList)
        return tripList.map(trip => 
            <li key={trip.id}>
                {/* <Link to={"/trip/" + trip.id}>{trip.trip_name}</Link>
                {' '}

                <button>Delete</button> */}
                <TripItem
                    id={trip.id}
                    name={trip.trip_name}
                    city={trip.city}
                    startDate={trip.start_date}
                    endDate={trip.end_date}
                    notes={trip.notes}
                />
            </li>       
        )
    }




    render () {
        const { error } = this.state
        return (
            <main className='dashboard'>
                <section className='upcoming-dashboard'>
                    <h2>Upcoming Trips</h2>
                    <ul>
                       {error ? <p className='error'>There was an error, try again</p>
                       : this.renderTrips()}
                    </ul>
                    <Link to='/add-trip'>Add a Trip</Link>
                </section>
            </main>
        )
    }
}