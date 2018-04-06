import React, { Component } from 'react';
import './App.css';
import CreditInput from './components/CreditInput';
import RepositoryLink from './components/RepositoryLink';

class App extends Component {
  constructor (props) {
    super(props);

    this.repositoryLink = 'https://github.com/ntucakovic/loan-estimate';
  }

  static getLanguage () {
    const translationRegex = /(sr|bs|hr)/;
    let language = 'en';

    try {
      if (window.navigator.language.match(translationRegex) ||
        (window.navigator.languages && window.navigator.languages.find((language) => language.match(translationRegex)))) {
        language = 'sr';
      }
    } catch (e) {
      // Do nothing, just avoid breaking the app.
    }

    return language;
  }

  render () {
    return (
      <div className='App'>
        <CreditInput />
        <RepositoryLink href={this.repositoryLink} />
      </div>
    );
  }
}

export default App;
