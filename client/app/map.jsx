import React from 'react';
import Modal from 'react-modal';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
    };
  }

  componentDidMount(){
    console.log(this.props);
  }

  render() {
    return (
      <div className='map-container'>
        <iframe
          width='95%'
          height='400'
          src={'https://www.google.com/maps/embed/v1/search?key=AIzaSyCnPK2o-dXX9hTQdMA4dTXIezhxyIzfRB0&q=pharmacy+near+'+this.props.zipcode}>
        </iframe>
      </div>
    );
  }
}
