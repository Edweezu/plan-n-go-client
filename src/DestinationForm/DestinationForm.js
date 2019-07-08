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
                <header className='destination-form-header'>
                    <h2>Activities<i onClick= {this.handleEditForm}className="fas fa-plus-circle"></i></h2>
                </header>
                    {/* <button onClick={this.handleEditForm}>Add a Destination</button> */}
                {this.state.showForm ? (
                     <form className='main-form' onSubmit={this.handleAddDestination}>
                        <div className='form-flex-container'>
                            <div className='add-trip-element'>
                                <label htmlFor="destination_name">Activity Name </label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input' type="text" name="destination_name" id="destination_name" required/>
                            </div>
                            <div className='add-trip-element'>
                                <label htmlFor="destination_date">Date </label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input' type="date" name="destination_date" id="destination_date" required/>
                            </div>
                        </div>
                        <div className='form-flex-container'>
                            <div className='add-trip-element'>
                                <label htmlFor="address">Address</label>
                                <input className='form-input' type="text" name="address" id="address"/>
                            </div>
                            <div className='add-trip-element'>
                                <label htmlFor="destination_notes">Notes</label>
                                <input className='form-input' type='text' name="destination_notes" id="destination_notes"
                                />
                            </div>
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

export default DestinationForm