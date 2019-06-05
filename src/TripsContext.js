import React from 'react'

const TripsContext = React.createContext({
    list: [],
    destinations: [],
    flights: [],
    store: [],
    users: []
})

export default TripsContext;