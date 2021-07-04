import { Component } from "react";
import Header from '../header'
import RandomPlanet from '../random-planet';
import ErrorIndicator from "../error-indicator";
import { 
  PeoplePage,
  PlanetPage, 
  StarshipPage,
  SecretPage,
  LoginPage } from "../pages";
import { SwapiServiceProvider } from "../swapi-service-context"
import SwapiService from "../../services/swapi-service";
import DummySwapiService from '../../services/dummy-swapi-service';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { StarshipDetails } from "../sw-components"


export default class App extends Component {

  state = {
    hasError: false,
    selectedPerson: "3",
    selectedStarship: "5",
    service: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({ isLoggedIn: true })
  }

  onServiceChange = () => {
    this.setState(({ service }) => {
      const Service = service instanceof SwapiService ? DummySwapiService : SwapiService;
      
      return {
        service: new Service()
      }
    })
  }

  onPersonSelected = (id) => {
    this.setState({ 
      selectedPerson: id 
    });
  };

  onStarshipSelected = (id) => {
    this.setState({ 
      selectedStarship: id 
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  };
  
  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    };

    return (
      <SwapiServiceProvider value={this.state.service} >
        <Router>
          <div className='container'>
            <Header onServiceChange={this.onServiceChange}/>
            <RandomPlanet />
            <Switch>
              <Route path="/" 
                render={() => <h2>Welcome to StarDB</h2>} 
                exact />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planet" component={PlanetPage} />
              <Route path="/starship" exact component={StarshipPage} />
              <Route path="/starship/:id" 
                render={({match}) => {
                  const {id} = match.params;
                  return <StarshipDetails itemId={id}/>
                }} />
              <Route 
                path="/login" 
                render={() => {
                  return <LoginPage 
                  isLoggedIn={this.state.isLoggedIn} 
                    onLogin={this.onLogin}/>
                }}/>
              <Route 
                path="/secret" 
                render={() => {
                  return <SecretPage isLoggedIn={this.state.isLoggedIn}/>
                }}/>

              <Route render={() => {
                return (
                  <div className="jumbotron">
                    <h2>Page not found 404</h2>
                  </div>
                )
              }}/>
            </Switch>
          </div>
        </Router>
      </SwapiServiceProvider>
    )
  }
}