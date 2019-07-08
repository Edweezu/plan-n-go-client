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
                    <h2 className='packing-list-header'>Packing List<i onClick= {this.handleEditForm}className="fas fa-plus-circle"></i></h2>
                    {/* <button type='button' onClick={this.handleEditForm}>
                        Add an Item
                    </button> */}
                {this.state.showForm ? (
                    <form className='main-form' onSubmit={this.handleAddItem}>
                        <div className='form-flex-container'>
                            <div className='add-trip-element'>
                                <label htmlFor="item_name">Item Name </label>
                                <span className='astrik'>
                                    *
                                </span>
                                <input className='form-input' type="text" name="item_name" id="item_name" required/>
                            </div>
                            <div className="add-trip-element">
                                <label htmlFor="list_notes">Notes</label>
                                <input className='form-input' type='text' name="list_notes" id="list_notes"
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

export default PackingListForm