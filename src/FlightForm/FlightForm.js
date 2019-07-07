import React from 'react'
import config from '../config'
import TokenService from '../services/token-service'
import TripsContext from '../TripsContext';


class FlightForm extends React.Component {

    static contextType = TripsContext

    state = {
        showForm: false
    }

    handleEditForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleSubmitForm = () => {
        this.setState({
            showForm: false
        })
    }


    handleAddFlight = (e) => {
        e.preventDefault()

        const tripid = this.props.tripid
        console.log('tripiddd', tripid)

        const { airline, flight_num, depart_date, depart_time, seats, flight_notes } = e.target

        const newFlight = {
            airline: airline.value,
            flight_num: flight_num.value,
            depart_date: depart_date.value,
            depart_time: depart_time.value,
            seats: seats.value,
            flight_notes: flight_notes.value,
        }

        console.log('newwwflight', newFlight)
        fetch(`${config.API_ENDPOINT}/trips/${tripid}/flights`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newFlight),
        })
        .then(res => {
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(flight => {
            console.log('posted flight', flight)
            airline.value = ''
            flight_num.value = ''
            depart_date.value = ''
            depart_time.value = ''
            seats.value = ''
            flight_notes.value = ''
            this.handleSubmitForm()
            this.context.addFlight(flight)
        })
        .catch(err => {
            console.error({ err })
        })
    }


    render () {
        return (
            <section className='trip-flight-form'>
                <header className='flight-form-header'>
                    <h2>Flights <i onClick= {this.handleEditForm}className="fas fa-plus-circle"></i></h2> 
                </header>
                    {/* <button type='button' onClick={this.handleEditForm}>
                        Add a Flight
                    </button> */}
                {this.state.showForm ? (
                    <form className='main-form' onSubmit={this.handleAddFlight}>
                    <div className='add-trip-element'>
                        <label htmlFor="airline">Airline </label>
                        <span className='astrik'>
                                *
                        </span>
                        <input className='form-input' type="text" name="airline" id="airline" required/>
                    </div>
                    <div className='add-trip-element'>
                        <label htmlFor="flight_num">Flight #</label>
                        <input className='form-input' type="number" name="flight_num" id="flight_num"/>
                    </div>
                    <div className='add-trip-element'>
                        <label htmlFor="depart_date">Departure Date </label>
                        <span className='astrik'>
                                *
                        </span>
                        <input className='form-input' type="date" name="depart_date" id="depart_date" required/>
                    </div>
                    <div className='add-trip-element'>
                        <label htmlFor="depart_time">Departure Time</label>
                        <input className='form-input' type="time" name="depart_time" id="depart_time"/>
                    </div>
                    <div className='add-trip-element'>
                        <label htmlFor="seats">Seats</label>
                        <input className='form-input' type="text" name="seats" id="seats"/>
                    </div>
                    <div className='add-trip-element'>
                        <label htmlFor="flight_notes">Notes</label>
                        <input className='form-input' type='text' name="flight_notes" id="flight_notes"
                        />
                    </div>
                    <div className='button-container'>
                        <button className='submit-button' type="submit">Submit</button>
                    </div>  
                </form>
                ) : null}
                
            </section>
        )
    }
}

export default FlightForm