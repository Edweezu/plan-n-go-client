import React from 'react'
import TripsContext from '../TripsContext';
import config from '../config'
import TokenService from '../services/token-service'
import { format } from 'date-fns'


class UpdateTripForm extends React.Component {

    static contextType = TripsContext

    state = {
        showForm: false,
        trip_name: '',
        city: '',
        start_date: '',
        end_date: ''
    }

    componentDidMount() {
        const { tripid } = this.props
        
        fetch(`${config.API_ENDPOINT}/trips/${tripid} `, {
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
            responseJson.end_date = this.formatSpecificDate(responseJson.end_date)
            responseJson.start_date = this.formatSpecificDate(responseJson.start_date)

            for (let key in responseJson) {
                if (responseJson[key] === null) {
                    responseJson[key] = ''
                }
            }

            this.setState({
                id: responseJson.id,
                trip_name: responseJson.trip_name,
                city: responseJson.city,
                start_date: responseJson.start_date,
                end_date: responseJson.end_date
            })
        })
    }

    handleEditTrip = (e) => {
        e.preventDefault()
        let { tripid } = this.props

        let { id, trip_name, city, start_date, end_date } = this.state

        const newTrip = {
            id, trip_name, city, start_date, end_date
        }

        fetch(`${config.API_ENDPOINT}/trips/${tripid}`, {
            method: 'PATCH',
            body: JSON.stringify(newTrip),
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
            this.resetFields(newTrip)
            this.handleCancelForm()
            this.context.updateTrip(newTrip)
        })
        .catch(error => {
            console.error(error)
        })
    }

    resetFields = (newTrip) => {
        this.setState({
            id: newTrip.id || '',
            trip_name: newTrip.trip_name || '',
            city: newTrip.city || '',
            start_date: newTrip.start_date || '',
            end_date: newTrip.end_date || ''
        })
    }


    handleChangeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    handleChangeName = (e) => {
        this.setState({
            trip_name: e.target.value
        })
    }

    handleChangeStart = (e) => {
        this.setState({
            start_date: e.target.value
        })
    }

    handleChangeEnd = (e) => {
        this.setState({
            end_date : e.target.value
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


    formatDate = (startdate, enddate) => {
        let [startYear, startMonth, startDay ] = startdate.substr(0, 10).split('-')
        let [endYear, endMonth, endDay ] = enddate.substr(0, 10).split('-')
        if (startMonth !== endMonth) {
            return format(new Date(startYear, (startMonth - 1), startDay), 'MMM D') + ' - ' + format(new Date(endYear, (endMonth - 1), endDay), 'MMM D, YYYY')
        } else {
            return format(new Date(startYear, (startMonth - 1), startDay), 'MMM D') + ' - ' + format(new Date(endYear, (endMonth - 1), endDay), 'D, YYYY')
        }
    }

    formatSpecificDate = (date) => {
        let [ year, month, day ] = date.substr(0, 10).split('-')
        return format(new Date(
                year,
                (month - 1),
                day,
        ), 'YYYY-MM-DD')
    }

    render () {
        let { trip_name, city, start_date, end_date, showForm } = this.state
        let { trip } = this.props

        return (
            <main className='UpdateTripForm'>
                <header className='trip-name-header'>
                    <h1>{trip.length === 0 ? trip.trip_name : trip[0].trip_name} <i onClick={this.handleEditForm}className="far fa-edit"></i></h1>
                    <p>
                        {trip.length === 0 ? trip.start_date : this.formatDate(trip[0].start_date, trip[0].end_date)}
                    </p>  
                </header>
                <div className='back-dash-btn'>
                    <button onClick={this.props.redirectDashboard}>
                       Back to Dashboard
                    </button>
                </div>
                {showForm ? (
                    <form className='main-form' onSubmit={this.handleEditTrip}>
                        <div className='form-flex-container'>
                            <div className='add-trip-element'>
                                <label htmlFor='city'>
                                    Destination City 
                                </label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input 'id='city' name='city' type='text'value={city} onChange={this.handleChangeCity} required/>
                            </div>
                            <div className='add-trip-element'>
                                <label htmlFor='trip-name'>
                                    Trip Name
                                </label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input' id='trip_name' name='trip_name' type='text' value={trip_name} onChange={this.handleChangeName}required/>
                            </div>
                        </div>
                        <div className='form-flex-container'>
                            <div className='add-trip-element'>
                                <label htmlFor='start-date'>
                                    Start Date 
                                </label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input' id='start_date' name='start_date' type='date' value={start_date} onChange={this.handleChangeStart}required/>
                            </div>
                            <div className='add-trip-element'>
                                <label htmlFor='end-date'>
                                    End Date 
                                </label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input' id='end_date' name='end_date' type='date' value={end_date} onChange={this.handleChangeEnd}required/>
                            </div>
                        </div>
                        <div className='button-container'>
                            <button className='submit-button 'type="submit">Submit</button>
                            <button className='cancel-button' type="button" onClick={this.handleCancelForm}>Cancel</button>
                        </div>
                    </form>
                ) : null}     
            </main>   
        )
    }
}

export default UpdateTripForm