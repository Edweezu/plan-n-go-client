import React from 'react'
import TripsContext from '../TripsContext'
import { Link } from 'react-router-dom'
// import Trip from '../Trip/Trip';
import config from '../config'
import TokenService from '../services/token-service'
import { format } from 'date-fns'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

class TripItem extends React.Component {
    static contextType = TripsContext

    state = {
        error: null

    }


    handleDeleteForm = () => {
        confirmAlert({
            title: '',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick : () => {
                        this.handleClickDelete()
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
    

    handleClickDelete = (e) => {
        console.log('deleted')
        const tripid = this.props.id

        console.log('propsss tripid', tripid)

        return fetch(`${config.API_ENDPOINT}/trips/${tripid}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => {
            console.log(' delete resss', res)
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            
            // return res.json()
        })
        .then(() => {
            this.context.deleteTrip(tripid)
            // allow parent to perform extra behaviour
            // this.props.onDeleteNote(tripid)
            // this.props.history.push('/dashboard')
        })
        .catch(error => {
            this.setState({
                error: error
            })
        })
    }

    formatDate = (startdate, enddate) => {
        let startSplit = startdate.split('-')
        let endSplit = enddate.split('-')
        if (endSplit[1] !== startSplit[1]) {
            return format(startdate, 'MMM D') + ' - ' + format(enddate, 'MMM D, YYYY')
        } else {
            return format(startdate, 'MMM D') + ' - ' + format(enddate, 'D, YYYY')
        }
    }

    render () {
        const { id, name, startDate, endDate} = this.props

        return (
            <section className='trip-item'>
                <h2 className='trip-item-title'>
                    <Link to={"/trip/" + id}>
                        {name}
                    </Link>
                    <i onClick={this.handleDeleteForm} className="far fa-trash-alt"></i>
                </h2>
                
                <p>
                    {/* {format(startDate, 'MMM D') + ' - ' + format(endDate, 'D, YYYY')} */}
                    {this.formatDate(startDate, endDate)}
                </p>
                {/* <button 
                    className='trip-item-delete'
                    type='button'
                    onClick={this.handleDeleteForm}
                >
                    Delete
                </button> */}
            </section>
        )
    }

}

export default TripItem