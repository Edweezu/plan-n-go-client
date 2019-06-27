import React from 'react'
import config from '../config'
import TokenService from '../services/token-service'
import TripsContext from '../TripsContext';


class PackingListForm extends React.Component {

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


    handleAddItem = (e) => {
        e.preventDefault()

        const tripid = this.props.tripid
        console.log('tripiddd', tripid)

        const { item_name, list_notes } = e.target

        const newItem = {
            item_name: item_name.value,
            list_notes: list_notes.value,
            checked: false
        }

        console.log('newItemmm', newItem)
        fetch(`${config.API_ENDPOINT}/trips/${tripid}/packing_list`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newItem),
        })
        .then(res => {
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(item => {
            console.log('posted item', item)
            item_name.value = ''
            list_notes.value = ''
            this.handleSubmitForm()
            this.context.addPackingItem(item)
        })
        .catch(err => {
            console.error({ err })
        })
    }


    render () {
        return (
            <section className='add-form-fields'>
                    <button type='button' onClick={this.handleEditForm}>
                        Add an Item
                    </button>
                {this.state.showForm ? (
                    <form onSubmit={this.handleAddItem}>
                        <div>
                            <label htmlFor="item_name">Item Name *</label>
                            <input type="text" name="item_name" id="item_name" required/>
                        </div>
                        <div className="form-section">
                            <label htmlFor="list_notes">Item Notes</label>
                            <input type='text' name="list_notes" id="list_notes"
                            />
                        </div>
                        <button type="submit">Submit</button> 
                    </form>
                ) : null}
                
            </section>
        )
    }
}

export default PackingListForm