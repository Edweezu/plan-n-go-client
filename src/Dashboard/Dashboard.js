import React from 'react'
import TripsContext from '../TripsContext'

export default class Dashboard extends React.Component {

    static contextType = TripsContext


    render () {
        const { store } = this.context
        console.log('storeeeee', store)
        return (
            <main className='dashboard'>
                <section className='upcoming-dashboard'>
                    <h2>Upcoming Trips</h2>
                    <ol>
                        {store.map((trip) => {
                            return <li>
                                {trip.name}
                            </li>
                        })}
                    </ol>
                </section>
            </main>
        )
    }
}