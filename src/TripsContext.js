import React from 'react'

const TripsContext = React.createContext({
    tripList: [],
    destinations: [],
    flights: [],
    store: [],
    users: []
})

export default TripsContext;