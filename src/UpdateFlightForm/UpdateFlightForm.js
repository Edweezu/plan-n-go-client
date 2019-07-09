import React from 'react'
import TripsContext from '../TripsContext';
import config from '../config'
import TokenService from '../services/token-service'
import { format } from 'date-fns'
import { confirmAlert } from 'react-confirm-alert'

class UpdateFlightForm extends React.Component {

    static contextType = TripsContext

    state = {
        error: null,
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

        fetch(`${config.API_ENDPOINT}/trips/${tripid}/flights/${flightid}`, {
            method: 'PATCH',
            body: JSON.stringify(newFlight),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
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

    handleDeleteFlight = () => {
        let { tripid, flightid } = this.props

        fetch(`${config.API_ENDPOINT}/trips/${tripid}/flights/${flightid}`, {
            method: 'DELETE',
            headers: {
                'content': 'application-json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
        })
        .then(data => {
            this.context.deleteFlight(flightid)
        })
        .catch(err => {
            console.error(err)
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


    handleDeleteForm = () => {
        confirmAlert({
            title: '',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick : () => {
                        this.handleDeleteFlight()
                    }
                },
                {
                    label: 'No',
                    onClick : () => {
                        this.setState({
                            error: null
                        })
                    }
                }
            ]
        })
    }

    render () {

        const { airline, flight_num, depart_date, depart_time, seats, flight_notes, showForm} = this.state

        return (
            <main className='UpdateFlightForm'>
                <div className='btn-div'>
                    <i onClick={this.handleEditForm}className="far fa-edit"></i>
                    <i onClick={this.handleDeleteForm}className="far fa-trash-alt"></i>
                </div>
                {showForm ? (
                    <form className='main-form' onSubmit={this.handleEditFlight}>
                        <div className='form-flex-container'>
                            <div className='add-trip-element'>
                                <label htmlFor="airline">Airline </label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input' type="text" name="airline" id="airline"
                                value={airline} onChange={this.handleChangeAirline}required/>
                            </div>
                            <div className='add-trip-element'>
                                <label htmlFor="flight_num">Flight #</label>
                                <input className='form-input' type="number" name="flight_num" id="flight_num" value={flight_num} onChange={this.handleChangeFlightNum}/>
                            </div>
                        </div>
                        <div className='form-flex-container'>
                            <div className='add-trip-element'>
                                <label htmlFor="depart_date">Departure Date </label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input' type="date" name="depart_date" id="depart_date" value={depart_date} onChange={this.handleChangeDepartDate}required/>
                            </div>
                            <div className='add-trip-element'>
                                <label htmlFor="depart_time">Departure Time</label>
                                <input className='form-input' type="time" name="depart_time" id="depart_time" value={depart_time} onChange={this.handleChangeDepartTime}/>
                            </div>
                        </div>
                        <div className='form-flex-container'>
                            <div className='add-trip-element'>
                                <label htmlFor="seats">Seats</label>
                                <input className='form-input' type="text" name="seats" id="seats" value={seats} onChange={this.handleChangeSeats}/>
                            </div>
                            <div className='add-trip-element'>
                                <label htmlFor="flight_notes">Notes</label>
                                <input className='form-input' type='text' name="flight_notes" id="flight_notes" value={flight_notes} onChange={this.handleChangeNotes}
                                />
                            </div>
                        </div>
                        <div className='button-container'>
                            <button className='submit-button' type="submit">Submit</button>
                            <button className='cancel-button' type="button" onClick={this.handleCancelForm}>Cancel</button>
                        </div>    
                    </form>
                ) : null}  
            </main>     
        )
    }
}

export default UpdateFlightForm