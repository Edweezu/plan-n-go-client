import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import TripsContext from '../TripsContext.js'
import Nav from '../Nav/Nav'
import LandingPage from '../LandingPage/LandingPage'
import CreateAccount from '../CreateAccount/CreateAccount'
import LoginPage from '../LoginPage/LoginPage'
import Dashboard from '../Dashboard/Dashboard'
import Trip from '../Trip/Trip'
import AddTrip from '../AddTrip/AddTrip'
import Footer from '../Footer/Footer'
import TokenService from '../services/token-service'
import UsersService from '../services/users-api-service'
import IdleService from '../services/idle-service'

class App extends React.Component {

  constructor (props) {
    super (props)
    this.state = {
      username: '',
      login: null,
      error: null,
      tripList: [],
      flights: [],
      destinations: [],
      packing_list: [],
      done: true,
      expired: false
    }
  }

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle)
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        UsersService.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    // if (!this.state.expired) {
    //   this.setState({
    //     expired: true
    //   })
    // }
    this.forceUpdate()
  }


  isLoggedIn = () => {
    this.setState({
      login: true,
      expired: false
    })
  }

  isLoggedOut = () => {
    this.setState({
      login: false
    })
  }

  setTripList = (tripList) => {
    this.setState({
      tripList
    })
  }

  setFlights = (flights) => {
    this.setState({
      flights
    })
  }

  setDestinations = (destinations) => {
    this.setState({
      destinations
    })
  }

  setList = (packing_list) => {
    this.setState({
      packing_list
    })
  }

  setFlightDone = () => {
    this.setState({
      done: true
    })
  }


  deleteTrip = (tripid) => {
    const { tripList } = this.state
    const trips = tripList.filter(trip => trip.id !== tripid)

    this.setState({
      tripList: trips
    })
  }
  
  

  addTrip = (trip) => {
    this.setState({
      tripList: [
        ...this.state.tripList,
        trip
      ]
    })
  }

  addFlight = (flight) => {
    this.setState({
      flights: [
        ...this.state.flights,
        flight
      ],
      done: true
    })
  }

  addDestination = (destination) => {
    this.setState({
      destinations: [
        ...this.state.destinations,
        destination
      ]
    })
  }

  addPackingItem = (item) => {
    this.setState({
      packing_list: [
        ...this.state.packing_list,
        item
      ]
    })
  }
  
  updateFlight = (updatedFlight) => {
    this.setState({
      flights: this.state.flights.map((flight) => (flight.id !== updatedFlight.id) ? flight : updatedFlight)
    })
  }

  updateTrip = (updatedTrip) => {
    this.setState({
      tripList: this.state.tripList.map((trip) => (trip.id !== updatedTrip.id) ? trip : updatedTrip)
    })
  }

  updateDestination = (updatedDestination) => {
    this.setState({
      destinations: this.state.destinations.map((destination) => (destination.id !== updatedDestination.id) ? destination : updatedDestination)
    })
  }

  deleteFlight = (flightid) => {
    this.setState({
      flights: this.state.flights.filter(flight => {
        return flight.id !== flightid
      })
    })
  }

  deleteDestination = (destinationid) => {
    this.setState({
      destinations: this.state.destinations.filter(destination => {
        return destination.id !== destinationid
      })
    })
  }

  deleteItem = (itemid) => {
    this.setState({
      packing_list: this.state.packing_list.filter(item => {
        return item.id !== itemid
      })
    })
  }

  handleCheckItem = (id) => {
    this.setState({
        packing_list: this.state.packing_list.map(item => {
          if (item.id === id) {
            item.checked = !item.checked
          }
          return item
        })
    })
  }   


  render () {
    const contextValue = {
      done: this.state.done,
      setFlightDone: this.setFlightDone,
      loggedOut: this.isLoggedOut,
      loggedIn: this.isLoggedIn,
      tripList: this.state.tripList,
      flights: this.state.flights,
      destinations: this.state.destinations,
      packing_list: this.state.packing_list,
      setTripList: this.setTripList,
      setFlights: this.setFlights,
      setDestinations: this.setDestinations,
      setList: this.setList,
      deleteTrip : this.deleteTrip,
      addTrip: this.addTrip,
      addFlight: this.addFlight,
      updateFlight: this.updateFlight,
      deleteFlight: this.deleteFlight,
      deleteDestination: this.deleteDestination,
      addDestination: this.addDestination,
      updateDestination: this.updateDestination,
      addPackingItem: this.addPackingItem,
      deleteItem: this.deleteItem,
      handleCheckItem: this.handleCheckItem,
      updateTrip: this.updateTrip,
      expired: this.state.expired
    }

    // if (this.state.expired) {
    //   console.log('inside ifff')
    //   return <Redirect to='/login'/>    
    // } else {
    //   console.log('inside elseee')
    // }

    // console.log('triplist stateee', this.state.tripList)

    return (
     <main className='app'>
        <section className='main-content'>
          <TripsContext.Provider value={contextValue}>
            <Nav /> 
            <Switch>
              <Route exact path ={'/'} component ={LandingPage}/>
              <Route path ={'/register'} component ={CreateAccount}/>
              <Route path ={'/login'} component ={LoginPage}/>
              <Route path ={'/dashboard'} component ={Dashboard}/>
              <Route path ={'/trip/:id'} component ={Trip}/>
              <Route path ={'/add-trip'} component ={AddTrip}/>
            </Switch>
          </TripsContext.Provider>
        </section>
        <Footer />
     </main>
    )
  }
}

export default App;
