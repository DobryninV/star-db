import React, { Component } from "react";
import ErrorButton from "../error-button/error-button";
import Spinner from "../spinner";

import './item-details.css';


const Record = ({ item, field, label }) => {
  return (
    <li className='list-group-item'>
      <span className='term'>{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { 
  Record 
};

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    isLoading: true
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(preProps) {
    if (this.props.itemId !== preProps.itemId ||
      this.props.getData !== preProps.getData ||
      this.props.getImageUrl !== preProps.getImageUrl) {
      this.updateItem();
    }
  }

  updateItem = () => {
    const { itemId, getData, getImageUrl } = this.props;

    this.setState({ isLoading: true });
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        const isLoading = false;
        this.setState({ item, image: getImageUrl(item), isLoading});
      });
  };

  render() {

    const { isLoading, item, image } =this.state;

    if (!item) {
      return (
        <div className='person-details card'>
          <span>Select a person from list</span>
        </div>
      )
    };

    if (isLoading) {
      return (
        <div className='item-details card'>
          <Spinner />
        </div>
      )
    }

    return (
      <div className='item-details card'>
        <img 
          className='person-image'
          src={image} 
          alt='character' />

        <div className='card-body'>
          <h4>{item.name}</h4>
          <ul className='list-group list-group-flush'>
            { React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item })
            }) }
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
};

