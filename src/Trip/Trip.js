import React from 'react';
import { Link } from 'react-router-dom'

export default class Trip extends React.Component {
    render () {
        const { id } = this.props.match.params
        return (
            <div>
                {id}
            </div>
        )
    }
}