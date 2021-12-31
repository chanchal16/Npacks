import React from 'react'
import './App.css'
import theme from './Theme'
import {ThemeProvider} from '@material-ui/core/styles'
import ApiContextProvider from './contexts/ApiContext'
import {BrowserRouter as Router,Link,Route, Switch,useHistory} from "react-router-dom";
import Nav from './components/Nav'
import Home from './components/Home'
import SinglePackage from './pages/SinglePackage'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'

function App() {
  
  return (
    <ApiContextProvider>
    <div className="App">
      <ThemeProvider theme={theme}>
        <Nav />
        <div className='main'>
        <Router>
        
          <Switch>
              <Route exact path='/'>
              <LandingPage />
              </Route>
              <Route path='/home' component={Home }/> 
              <Route path='/package/:name' component={SinglePackage } />         
          </Switch>
        </Router>
        </div>
      <Footer />
      </ThemeProvider>
    </div>
    </ApiContextProvider>
  )
}

export default App
