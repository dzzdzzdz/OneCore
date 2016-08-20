import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Button, PageHeader } from 'react-bootstrap';

export default class NavigateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'username': window.localStorage.username
    }
  }

  componentDidMount() {
    if(!window.localStorage.latitude) {
      navigator.geolocation.getCurrentPosition(function(location) {
        window.localStorage.latitude = location.coords.latitude;
        window.localStorage.longitude = location.coords.longitude;
      });
    }
  }

  render() {
    return (
      <div className='navbar-container'>
        <h1 className='title'>OneCare</h1>
        <div className='top'></div>
        <div onClick={() => {window.localStorage.removeItem('username'); window.localStorage.removeItem('token')}}>
          <div className='logout'><Link to='/signin'><Button bsSize='large' bsStyle='danger'>Logout</Button></Link></div>
        </div>
      </div>
    );
  }
}
