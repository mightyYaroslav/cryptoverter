import React from 'react';
import '../stylesheets/css/Header.css';
import arrows from '../stylesheets/pictures/arrows.png';
import {Grid, Row, Col} from 'react-bootstrap';

export class Header extends React.Component{
  render(){
    return (
      <div className='Header'>
        <img src={arrows} width='5%'/>
        <h1>crypto exchanger.</h1>
      </div>
    );
  }
}
