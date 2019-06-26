import React from 'react'
import config from '../config'
import TokenService from '../services/token-service'
import TripsContext from '../TripsContext';


class DestinationForm extends React.Component {

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


    handleAddDestination = (e) => {
        e.preventDefault()

        const tripid = this.props.tripid

        const { destination_name, destination_date, address, destination_notes } = e.target

        const newDestination = {
            destination_name: destination_name.value,
            destination_date: destination_date.value,
            address: address.value,
            destination_notes: destination_notes.value
        }

        console.log('newwDestination', newDestination)
        fetch(`${config.API_ENDPOINT}/trips/${tripid}/destinations`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newDestination),
        })
        .then(res => {
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(destination => {
            console.log('posted destination', destination)
            destination_name.value = ''
            destination_date.value = ''
            address.value = ''
            destination_notes.value = ''
            this.handleSubmitForm()
            this.context.addDestination(destination)
        })
        .catch(err => {
            console.error({ err })
        })
    }


    render () {
        return (
            <section className='trip-destination-form'>
                    <h2>Activities / Destinations</h2>
                    <button onClick={this.handleEditForm}>Add a Destination</button>
                {this.state.showForm ? (
                     <form onSubmit={this.handleAddDestination}>
                        <div className="form-section">
                            <label htmlFor="destination_name">Destination Name *</label>
                            <input type="text" name="destination_name" id="destination_name" required/>
                        </div>
                        <div className="form-section">
                            <label htmlFor="destination_date">Date *</label>
                            <input type="date" name="destination_date" id="destination_date" required/>
                        </div>
                        <div className="form-section">
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" id="address"/>
                        </div>
                        <div className="form-section">
                            <label htmlFor="destination_notes">Destination Notes</label>
                            <input type='text' name="destination_notes" id="destination_notes"
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                ) : null}
                
            </section>
        )
    }
}

export default DestinationForm