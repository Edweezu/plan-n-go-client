import React from 'react'
import TripsContext from '../TripsContext';
import config from '../config'
import TokenService from '../services/token-service'
import { format } from 'date-fns'

class UpdateDestinationForm extends React.Component {

    static contextType = TripsContext

    state = {
        showForm: false,
        id: '',
        destination_name: '',
        destination_date: '',
        address: '',
        destination_notes: '',
        trip_id: ''
    }

    componentDidMount() {
        const { tripid, destinationid } = this.props
        
        fetch(`${config.API_ENDPOINT}/trips/${tripid}/flights/${destinationid} `, {
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

            responseJson.destination_date = format(responseJson.destination_date, 'YYYY-MM-DD')

            for (let key in responseJson) {
                if (responseJson[key] === null) {
                    responseJson[key] = ''
                }
            }

            this.setState({
                id: responseJson.id,
                destination_name: responseJson.destination_name,
                destination_date: responseJson.destination_date,
                destination_notes: responseJson.destination_notes,
                trip_id: responseJson.trip_id
            })
        })
    }

    handleEditDestination = (e) => {
        e.preventDefault()
        let { tripid, destinationid } = this.props

        let { id, destination_name, destination_date, address, destination_notes, trip_id } = this.state

        const newDestination = {
            id,
            destination_name, 
            destination_date, 
            address, 
            destination_notes, 
            trip_id
        }

        console.log('newDestinationnn', newDestination)

        fetch(`${config.API_ENDPOINT}/trips/${tripid}/flights/${destinationid}`, {
            method: 'PATCH',
            body: JSON.stringify(newDestination),
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
            this.resetFields(newDestination)
            this.handleCancelForm()
            this.context.updateDestination(newDestination)
        })
        .catch(error => {
            console.error(error)
        })

    }

    resetFields = (newDestination) => {
        this.setState({
            id: newDestination.id || '',
            destination_name: newDestination.destination_name || '',
            destination_date: newDestination.destination_date || '',
            address: newDestination.address || '',
            destination_notes: newDestination.destination_notes || '',
            trip_id: newDestination.trip_id || ''
        })
    }

    handleDeleteDestination = () => {
        let { tripid, destinationid } = this.props

        fetch(`${config.API_ENDPOINT}/trips/${tripid}/flights/${destinationid}`, {
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
            this.context.deleteDestination(destinationid)
        })
        .catch(err => {
            console.error(err)
        })
    }

    handleChangeName = (e) => {
        this.setState({
            destination_name: e.target.value
        })
    }

    handleChangeDate = (e) => {
        this.setState({
            destination_date: e.target.value
        })
    }

    handleChangeAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    handleChangeNotes = (e) => {
        this.setState({
            destination_notes : e.target.value
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

        const { destination_name, destination_date, address, destination_notes, trip_id, showForm} = this.state

        return (
            <main className='UpdateFlightForm'>
                <div>
                    <button onClick={this.handleEditForm}>
                        Edit
                    </button>
                    <button onClick={this.handleDeleteDestination}>
                        Delete
                    </button>
                </div>
                {showForm ? (
                    <form onSubmit={this.handleEditDestination}>
                    <div className="form-section">
                            <label htmlFor="destination_name">Destination Name *</label>
                            <input type="text" name="destination_name" id="destination_name" required value={destination_name} onChange={this.handleChangeName}/>
                        </div>
                        <div className="form-section">
                            <label htmlFor="destination_date">Date</label>
                            <input type="date" name="destination_date" id="destination_date" value={destination_date} onChange={this.handleChangeDate}/>
                        </div>
                        <div className="form-section">
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" id="address" value={address} onChange={this.handleChangeAddress}/>
                        </div>
                        <div className="form-section">
                            <label htmlFor="destination_notes">Destination Notes</label>
                            <input type='text' name="destination_notes" id="destination_notes" value={destination_notes} onChange={this.handleChangeNotes}
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

export default UpdateDestinationForm