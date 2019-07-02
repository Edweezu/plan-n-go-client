import React from 'react'
import { Link } from 'react-router-dom'
import dataimage from '../website-images/secure-data.jpg'
import itinerary from '../website-images/itinerary.jpg'
import packinglist from '../website-images/packing-list.jpg'

class LandingPage extends React.Component {
    render () {
        return (
            <main className='landing-page container'>
                <header className='landing-page-header'>
                    <h1>Trip Planning Simplified</h1>
                    <Link className="link btn" to='/register'>Create an Account</Link>
                </header>
                <section className='landing-descript-container'>
                    <h2>
                        Plan-n-Go Functionalities
                    </h2>
                    <section className='landing-descript-two'> 
                        <div className='landing-descript-img-data'>
                            <img className='descript-img'src={dataimage} alt="secure data"/>
                        </div>
                        <p>
                            Manage Countless Amount of Trips in One Place while knowing that your Data will be Secure. 
                        </p>
                    </section>
                    <section className='landing-descript-two'>
                        <div className='landing-descript-img-data'>
                            <img className='descript-img'src={itinerary} alt="secure data"/>
                        </div>
                        <p>Create Lavish Trip Excursions with our Detailed Travel Itinerary.</p>
                    </section>
                    <section className='landing-descript-two'>
                        <div className='landing-descript-img-data'>
                            <img className='descript-img'src={packinglist} alt="secure data"/>
                        </div>
                        <p>Check, Add, and Delete Items off our Intuitive Packing List.</p>
                    </section>
                </section>   
                <section className='landing-page-reminder'>
                    <Link className="link btn" to='/register'>Lets Get Started</Link>
                </section>
            </main>
        )
    }
}

export default LandingPage;