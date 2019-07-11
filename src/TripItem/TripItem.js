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

        const tripid = this.props.id

        return fetch(`${config.API_ENDPOINT}/trips/${tripid}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
        })
        .then(() => {
            this.context.deleteTrip(tripid)
        })
        .catch(error => {
            this.setState({
                error: error
            })
        })
    }

    formatDate = (startdate='', enddate='') => {
        let [startYear, startMonth, startDay ] = startdate.substr(0, 10).split('-')
        let [endYear, endMonth, endDay ] = enddate.substr(0, 10).split('-')
        if (startMonth !== endMonth) {
            return format(new Date(startYear, (startMonth - 1), startDay), 'MMM D') + ' - ' + format(new Date(endYear, (endMonth - 1), endDay), 'MMM D, YYYY')
        } else {
            return format(new Date(startYear, (startMonth - 1), startDay), 'MMM D') + ' - ' + format(new Date(endYear, (endMonth - 1), endDay), 'D, YYYY')
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
                    {this.formatDate(startDate, endDate)}
                </p>
            </section>
        )
    }
}

export default TripItem