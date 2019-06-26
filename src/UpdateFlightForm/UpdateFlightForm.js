import React from 'react'
import TripsContext from '../TripsContext';
import config from '../config'
import TokenService from '../services/token-service'
import { format } from 'date-fns'

class UpdateFlightForm extends React.Component {

    static contextType = TripsContext

    state = {
        showForm: false,
        id: '',
        airline: '',
        flight_num: '',
        depart_date: '',
        depart_time: '',
        seats: '',
        flight_notes: '',
        trip_id: ''
    }

    componentDidMount() {
        const { tripid, flightid } = this.props
        
        fetch(`${config.API_ENDPOINT}/trips/${tripid}/flights/${flightid} `, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(responseJson => {

            responseJson.depart_date = format(responseJson.depart_date, 'YYYY-MM-DD')

            for (let key in responseJson) {
                if (responseJson[key] === null) {
                    responseJson[key] = ''
                }
            }

            this.setState({
                id: responseJson.id,
                airline: responseJson.airline,
                flight_num: responseJson.flight_num,
                depart_date: responseJson.depart_date,
                depart_time: responseJson.depart_time,
                seats: responseJson.seats,
                flight_notes: responseJson.flight_notes,
                trip_id: responseJson.trip_id
            })
        })
    }

    handleEditFlight = (e) => {
        e.preventDefault()
        let { tripid, flightid } = this.props

        let { id, airline, flight_num, depart_date, depart_time, seats, flight_notes, trip_id } = this.state

        const newFlight = {
            id,
            airline,
            flight_num,
            depart_date,
            depart_time,
            seats,
            flight_notes,
            trip_id
        }

        console.log('newflighttt', newFlight)

        fetch(`${config.API_ENDPOINT}/trips/${tripid}/flights/${flightid}`, {
            method: 'PATCH',
            body: JSON.stringify(newFlight),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            console.log('hi')
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
        })
        .then(responseJson => {
            //returns nothing
            this.resetFields(newFlight)
            this.handleCancelForm()
            this.context.updateFlight(newFlight)
        })
        .catch(error => {
            console.error(error)
        })

    }

    resetFields = (newFlight) => {
        this.setState({
            id: newFlight.id || '',
            airline: newFlight.airline || '',
            flight_num: newFlight.flight_num || '',
            depart_date: newFlight.depart_date || '',
            depart_time: newFlight.depart_time || '',
            seats: newFlight.seats || '',
            flight_notes: newFlight.flight_notes || '',
            trip_id: newFlight.trip_id || ''
        })
    }

    handleChangeAirline = (e) => {
        this.setState({
            airline: e.target.value
        })
    }

    handleChangeFlightNum = (e) => {
        this.setState({
            flight_num: e.target.value
        })
    }

    handleChangeDepartDate = (e) => {
        this.setState({
            depart_date: e.target.value
        })
    }

    handleChangeDepartTime = (e) => {
        this.setState({
            depart_time : e.target.value
        })
    }

    handleChangeSeats = (e) => {
        this.setState({
            seats : e.target.value
        })
    }

    handleChangeNotes = (e) => {
        this.setState({
            flight_notes : e.target.value
        })
    }

    handleEditForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleCancelForm = () => {
        this.setState({
            showForm: false
        })
    }


    render () {

        const { airline, flight_num, depart_date, depart_time, seats, flight_notes, showForm} = this.state

        return (
            <main className='UpdateFlightForm'>
                <div>
                    <button onClick={this.handleEditForm}>
                        Edit
                    </button>
                    <button >
                        Delete
                    </button>
                </div>
                {showForm ? (
                    <form onSubmit={this.handleEditFlight}>
                    <div className="form-section">
                        <label htmlFor="airline">Airline *</label>
                        <input type="text" name="airline" id="airline"
                        value={airline} onChange={this.handleChangeAirline}required/>
                    </div>
                    <div className="form-section">
                        <label htmlFor="flight_num">Flight #</label>
                        <input type="number" name="flight_num" id="flight_num" value={flight_num} onChange={this.handleChangeFlightNum}/>
                    </div>
                    <div className="form-section">
                        <label htmlFor="depart_date">Departure Date *</label>
                        <input type="date" name="depart_date" id="depart_date" value={depart_date} onChange={this.handleChangeDepartDate}required/>
                    </div>
                    <div className="form-section">
                        <label htmlFor="depart_time">Departure Time</label>
                        <input type="time" name="depart_time" id="depart_time" value={depart_time} onChange={this.handleChangeDepartTime}/>
                    </div>
                    <div className="form-section">
                        <label htmlFor="seats">Seats</label>
                        <input type="text" name="seats" id="seats" value={seats} onChange={this.handleChangeSeats}/>
                    </div>
                    <div className="form-section">
                        <label htmlFor="flight_notes">Notes</label>
                        <input type='text' name="flight_notes" id="flight_notes" value={flight_notes} onChange={this.handleChangeNotes}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={this.handleCancelForm}>Cancel</button>
                </form>
                ) : null}
                
            </main>
            
        )
    }
}

export default UpdateFlightForm