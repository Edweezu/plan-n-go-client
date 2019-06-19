import React from 'react'
import TripsContext from '../TripsContext'
import { Link } from 'react-router-dom'
// import Trip from '../Trip/Trip'

export default class Dashboard extends React.Component {

    static contextType = TripsContext
    

    render () {
        const { store } = this.context
        
        return (
            <main className='dashboard'>
                <section className='upcoming-dashboard'>
                    <h2>Upcoming Trips</h2>
                    <ul>
                        {store.map(trip =>
                            <li key={trip.id}>
                                <Link to={"/trip/" + trip.id}>{trip.name}</Link>
                                {' '}
                                <button>Delete</button>
                            </li>                   
                        )}
                    </ul>
                    <Link to='/add-trip'>Add a Trip</Link>
                </section>
            </main>
        )
    }
}