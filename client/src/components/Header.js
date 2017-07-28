import React from 'react';
import '../stylesheets/css/Header.css';
import arrows from '../stylesheets/pictures/arrows.png';

export class Header extends React.Component{
  render(){
    return (
      <div className='Header'>
        <img src={arrows} alt='arrows-logo' width='5%'/>
        <h1>crypto exchanger.</h1>
      </div>
    );
  }
}
