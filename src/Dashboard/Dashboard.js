import React from 'react'
import TripsContext from '../TripsContext'
// import { Link, Redirect } from 'react-router-dom'
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
        return tripList.map(trip => 
            <li key={trip.id}>
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

    renderAddForm = () => {
        this.props.history.push('/add-trip')
    }



    render () {
        const { error } = this.state
        return (
            <main className='dashboard'>
                <section className='trips-dashboard-container'>
                    <h1 className='dashboard-header'>Dashboard<i onClick= {this.renderAddForm}className="fas fa-plus-circle"></i></h1>
                    <ul>
                       {error ? <p className='error'><strong>Error! You have been logged out. Please log back in to continue.</strong></p>
                       : this.renderTrips()}
                       {error ? alert('Error! You have been logged out. Please log back in to continue.')
                       : ''}
                    </ul>
                </section>
                {/* <div className='dash-add-div'>
                    <Link className='btn dashboard-add' to='/add-trip'>Add a Trip</Link>
                </div> */}
            </main>
        )
    }
}