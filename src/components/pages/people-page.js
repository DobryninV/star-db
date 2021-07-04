  
import React, { Component } from 'react';
import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import { withRouter } from 'react-router';

const PeoplePage = ({ history, match }) => {

  const { id } = match.params;

  return (
    <Row
      left={<PersonList onItemSelected={(id) => history.push(id)} />}
      right={
        <ErrorBoundry>
          <PersonDetails itemId={id} />
        </ErrorBoundry>
      } />
  );
}


export default withRouter(PeoplePage)