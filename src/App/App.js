import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import TripsContext from '../TripsContext.js'
import Nav from '../Nav/Nav'
import LandingPage from '../LandingPage/LandingPage'
import CreateAccount from '../CreateAccount/CreateAccount'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import store from '../store.js'
import Trip from '../Trip/Trip'
import AddTrip from '../AddTrip/AddTrip'
import Footer from '../Footer/Footer'

class App extends React.Component {

  constructor (props) {
    super (props)
    this.state = {
      // store: []
    }
  }


  // componentDidMount() {
  //   this.setState({
  //     store
  //   })
  // }


  render () {

    // const { store } = this.state

    const contextValue = {
      store
    }

    return (
     <main className='app'>
      <Nav />
      <TripsContext.Provider value={contextValue}>
        <Switch>
          <Route exact path ='/' component ={LandingPage}/>
          <Route path ='/register' component ={CreateAccount}/>
          <Route path ='/login' component ={Login}/>
          <Route path ='/dashboard' component ={Dashboard}/>
          <Route path ='/trip/:id' component ={Trip}/>
          <Route path ='/add-trip' component ={AddTrip}/>

        </Switch>
      </TripsContext.Provider>
      <Footer />
     </main>
     
    )
  }
}

export default App;
