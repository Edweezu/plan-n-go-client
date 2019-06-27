import React from 'react'
import TripsContext from '../TripsContext';
import config from '../config'
import TokenService from '../services/token-service'

class UpdatePackingListForm extends React.Component {

    static contextType = TripsContext

   

   
    handleDeleteItem = () => {
        let { tripid, itemid } = this.props

        fetch(`${config.API_ENDPOINT}/trips/${tripid}/packing_list/${itemid}`, {
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
            this.context.deleteItem(itemid)
        })
        .catch(err => {
            console.error(err)
        })
    }


    



    render () {

        return (
            <span>
                <button onClick={this.handleDeleteItem}>
                    Delete
                </button>
            </span>  
        )
    }
}

export default UpdatePackingListForm