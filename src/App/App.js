import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import TripsContext from '../TripsContext.js'
import Nav from '../Nav/Nav'
import LandingPage from '../LandingPage/LandingPage'
import CreateAccount from '../CreateAccount/CreateAccount'
import LoginPage from '../LoginPage/LoginPage'
import Dashboard from '../Dashboard/Dashboard'
import store from '../store.js'
import Trip from '../Trip/Trip'
import AddTrip from '../AddTrip/AddTrip'
import Footer from '../Footer/Footer'

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
      done: true
    }
  }


  componentDidMount() {
    
  }

  isLoggedIn = () => {
    this.setState({
      login: true
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

  changeFlight = () => {
    console.log('done statee', this.state.done)
    this.setState({
      done: !this.state.done
    })
  }

  deleteTrip = (tripid) => {
    console.log('inside of deletetrip')
    const { tripList } = this.state
    const trips = tripList.filter(trip => trip.id !== tripid)

    this.setState({
      tripList: trips
    })
  }
  
  

  addTrip = (trip) => {
    console.log('inside of addtrip')
    this.setState({
      tripList: [
        ...this.state.tripList,
        trip
      ]
    })
  }

  addFlight = (flight) => {
    console.log('inside of addFlight')
    this.setState({
      flights: [
        ...this.state.flights,
        flight
      ],
      done: true
    })
  }


  render () {

    
    const contextValue = {
      store,
      done: this.state.done,
      setFlightDone: this.setFlightDone,
      changeFlight: this.changeFlight,
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
      

      // setError: this.setError
    }

    console.log('real state', this.state)

    return (
     <main className='app'>
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
      <Footer />
     </main>
     
    )
  }
}

export default App;
