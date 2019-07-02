import React from 'react'
import { Link } from 'react-router-dom'

class LandingPage extends React.Component {
    render () {
        return (
            <main className='landing-page container'>
                <header>
                    <h1>
                        Plan n Go
                    </h1>
                </header>
                <section className='landing-descript-main'>
                    <h2>Trip Planning Simplified</h2>
                    <p>
                    Many times, planning trips, especially long trips, is often times the most stressful and arduous part of the journey. Plan n Go helps simplify the experience by keeping all your trip details in one spot. You can also edit flight paths and add items onto your endless packing list all on the app. Get started now by simply creating an account! 
                    </p>
                    <Link className="link btn" to='/register'>Create an Account</Link>
                </section>
                <section className='landing-descript-two'>
                    <h2>Create Lavish trip Plans</h2>
                    <p>
                    Plan and go on that dream vacation you've always wanted. Get up to date weather details, set crucial flight times, and create detailed daily itineraries for your vacation. 
                    </p>
                </section>
                <section className='landing-descript-two'>
                    <h2>Your Personal Packing List</h2>
                    <p>
                    Have you ever realized that you've forgotten something a couple hours after leaving the house for a trip? Never forget again with our very intuitive packing list.
                    </p>
                </section>
            </main>
        )
    }
}

export default LandingPage;