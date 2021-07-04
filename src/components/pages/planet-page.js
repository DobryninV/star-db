  
import React, { Component } from 'react';
import { PlanetDetails, PlanetList } from '../sw-components';
import Row from '../row';

import ErrorBoundry from '../error-boundry';

export default class PlanetsPage extends Component {

  state = {
    selectedItem: null
  };

  onItemSelected = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;

    return (
      <Row
        left={<PlanetList onItemSelected={this.onItemSelected} />}
        right={
        <ErrorBoundry>
          <PlanetDetails itemId={selectedItem} />
        </ErrorBoundry>
        } />
    );
  }
}