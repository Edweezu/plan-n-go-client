import React from 'react'

const TripsContext = React.createContext({
    list: [],
    destinations: [],
    flights: [],
    store: []
})

export default TripsContext;