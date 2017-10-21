import React, { Component } from 'react';
import './App.css';
import CreditInput from './Components/CreditInput/CreditInput'

class App extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <CreditInput />
      </div>
    );
  }
}

export default App;
