import React, { Component } from "react";
import PropTypes from "prop-types";
import SwapiService from '../../services/swapi-service.js';
import Spinner from '../spinner';
import PlanetView from './planet-view';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  static defaultProps = {
    updateInterval: 10000
  };

  static propTypes = {
    updateInterval: PropTypes.number
  }

  state = { 
    planet: {},
    isLoading: true,
    isError: false
  };

  componentDidMount() { 
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      isLoading: false
    });
  };

  onError = (err) => {
    this.setState({
      isError: true,
      isLoading: false
    });
  }

  updatePlanet = () => {

    const id = Math.floor(Math.random()*18) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  };

  render() {
    const { planet, isLoading, isError } = this.state;

    const hasData = !(isLoading || isError);

    const errorMessage = isError ? <ErrorIndicator /> : null;
    const spinner = isLoading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;


    return (
      <div className="planet-card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
};

