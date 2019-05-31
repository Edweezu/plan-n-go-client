import React from 'react'

const TripsContext = React.createContext({
    list: [],
    places: [],
    flights: [],
    store: []
})

export default TripsContext;