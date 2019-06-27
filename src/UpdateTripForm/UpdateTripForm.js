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

            responseJson.end_date = format(responseJson.end_date, 'YYYY-MM-DD')
            responseJson.start_date = format(responseJson.start_date, 'YYYY-MM-DD')

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

        console.log('newTrippp', newTrip)

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

   


    render () {

        let { trip_name, city, start_date, end_date, showForm } = this.state

        return (
            <main className='UpdateTripForm'>
                <div>
                    <button onClick={this.handleEditForm}>
                        Edit Trip
                    </button>
                    <button onClick={this.props.redirectDashboard}>
                       Back to Dashboard
                    </button>
                </div>
                {showForm ? (
                    <form onSubmit={this.handleEditTrip}>
                    <div className='signup-element'>
                        <label htmlFor='city'>
                            Destination City*  
                        </label>
                        <input id='city' name='city' type='text'value={city} onChange={this.handleChangeCity} required/>
                    </div>
                    <div className='signup-element'>
                        <label htmlFor='trip-name'>
                            Trip Name*
                        </label>
                        <input id='trip_name' name='trip_name' type='text' value={trip_name} onChange={this.handleChangeName}required/>
                    </div>
                    <div className='signup-element'>
                        <label htmlFor='start-date'>
                            Start Date*   
                        </label>
                        <input id='start_date' name='start_date' type='date' value={start_date} onChange={this.handleChangeStart}required/>
                    </div>
                    <div className='signup-element'>
                        <label htmlFor='end-date'>
                            End Date* 
                        </label>
                        <input id='end_date' name='end_date' type='date' value={end_date} onChange={this.handleChangeEnd}required/>
                    </div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={this.handleCancelForm}>Cancel</button>
                </form>
                ) : null}
                
            </main>
            
        )
    }
}

export default UpdateTripForm