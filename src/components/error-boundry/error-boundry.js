import { Component } from 'react';
import ErrorIndicator from '../error-indicator';


export default class ErrorBoundry extends Component {
  state = {
    isError: false
  };

  componentDidCatch() {
    console.log('error');
    this.setState({isError: true})
  };

  render() {
    if (this.state.isError) {
      return <ErrorIndicator />
    }

    return this.props.children;
  };
};