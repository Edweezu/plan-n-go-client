import React from 'react';
import { Link } from 'react-router-dom'

export default class AddTrip extends React.Component {
    render () {
        return (
            <form>
                <div className='signup-element'>
                    <label htmlFor='city'>
                        Destination City    
                    </label>
                    <input id='city' name='city' type='text'/>
                </div>
                <div className='signup-element'>
                    <label htmlFor='trip-name'>
                        Trip Name    
                    </label>
                    <input id='trip-name' name='trip-name' type='text'/>
                </div>
                <div className='signup-element'>
                    <label htmlFor='start-date'>
                        Start Date   
                    </label>
                    <input id='start-date' name='start-date' type='date'/>
                </div>
                <div className='signup-element'>
                    <label htmlFor='end-date'>
                        End Date   
                    </label>
                    <input id='end-date' name='end-date' type='date'/>
                </div>
                <div className='signup-element'>
                    <label htmlFor='notes'>
                        Trip Notes   
                    </label>
                    <input id='notes' name='notes' type='text' rows='5'/>
                </div>
                <div className='add-trip-button'>
                    {/* <button type='submit'>Add Trip</button> */}
                    <Link to ='/dashboard'>Add Trip</Link>
                </div>
                <div>
                    <Link to ='/dashboard'>Cancel</Link>
                </div>
            </form>
        )
    }
}