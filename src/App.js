import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import Aplication from "./Aplication";

class App extends Component {
  render() {
    return (
      <div>
        <Aplication/>
      </div>
    );
  }
}

export default App;
