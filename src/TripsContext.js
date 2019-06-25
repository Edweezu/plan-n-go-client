import React from 'react'

const TripsContext = React.createContext({
    tripList: [],
    destinations: [],
    flights: [],
    packing_list: [],
    store: [],
    loggedOut: () => {},
    loggedIn: () => {},
    setTripList: () => {},
    deleteTrip: () => {},
    addTrip: () => {},
    addFlight: () => {}

})

export default TripsContext;