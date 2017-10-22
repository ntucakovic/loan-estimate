import React, { Component } from 'react';
import './App.css';
import CreditInput from './Components/CreditInput/CreditInput';
import LocalizedStrings from 'react-localization';
import strings from './Components/Localization';

class App extends Component {
  constructor (props) {
    super(props);

    this.strings = App.generateLocalizedStrings();
    this.strings.setLanguage(App.getLanguage());
  }

  static generateLocalizedStrings () {
    return new LocalizedStrings(strings);
  }

  static checkPreferredLanguages (language) {
    return language.match(/(sr|bs|hr)/);
  }

  static getLanguage () {
    let language = 'en';

    try {
      if (window.navigator.language.match(/(sr|bs|hr)/) ||
        (window.navigator.languages && window.navigator.languages.find(App.checkPreferredLanguages))) {
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
        <CreditInput localizedStrings={this.strings} />
      </div>
    );
  }
}

export default App;
