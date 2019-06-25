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
      tripList: []
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


  render () {

    
    const contextValue = {
      store,
      
      loggedOut: this.isLoggedOut,
      loggedIn: this.isLoggedIn,
      tripList: this.state.tripList,
      setTripList: this.setTripList,
      deleteTrip : this.deleteTrip,
      addTrip: this.addTrip
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
