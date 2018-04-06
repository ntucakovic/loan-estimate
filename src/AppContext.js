import React from 'react';
import PropTypes from 'prop-types';

import localization from './components/Localization';
import App from './App';
import { repository } from './modules/data';
import CreditCalculation from './modules/CreditCalculation';
import CreditInput from './components/CreditInput';
import { withRouter } from 'react-router';

const AppContext = React.createContext();

class AppProvider extends React.Component {
  static DEFAULT_STATE = {
    calculations: {
      draft: { ...CreditInput.DEFAULT_PARAMETERS }
    }
  };

  static LOCAL_STORAGE_KEY = 'CREDIT_CALCULATIONS';
  static contextTypes = {
    router: PropTypes.object
  }

  constructor (props) {
    super(props);

    // Set language.
    localization.setLanguage(App.getLanguage());

    const creditCalculationsStorage = window.localStorage.getItem(AppProvider.LOCAL_STORAGE_KEY);
    const creditCalculations = JSON.parse(creditCalculationsStorage) || { calculations: {} };

    // Merge local storage calculations with draft one.
    const calculations = Object.assign({}, { ...AppProvider.DEFAULT_STATE.calculations }, { ...creditCalculations.calculations });

    this.state = { calculations };
  }

  getCalculation = (calculationId) => {
    const { calculations } = this.state;

    if (calculationId) {
      return calculations[calculationId] || null;
    }

    return calculations['draft'];
  }

  updateCalculation = (calculationId = null) => {
    return (event) => {
      const calculationKey = calculationId || 'draft';

      let { ...calculation } = this.getCalculation(calculationId);
      let { calculations = {} } = this.state;

      const target = event.target;
      const name = target.name;
      const value = target.value;

      calculation[name] = value || 0;

      const result = CreditCalculation.getRates(calculation);

      calculation = Object.assign({}, calculation, result);

      // Update existing calculation.
      calculations = Object.assign(
        {},
        { ...calculations },
        { [calculationKey]: calculation }
      );

      this.setState({
        calculations
      }, this.updateLocalStorage);
    };
  }

  saveCalculation = (calculationId = null) => {
    return () => {
      // Get current calculation state.
      const { ...calculation } = this.getCalculation(calculationId);

      // Set calculation ID if doesn't exist.
      calculationId = calculationId || new Date().getTime();
      let { calculations } = this.state;

      const name = window.prompt(localization.getString('chooseCalculationName', localization.getLanguage()), calculation.name || '');

      if (!name) {
        return;
      }

      calculation.id = calculationId;
      calculation.name = name;

      // Update existing calculations.
      const newCalculations = Object.assign({},
        { ...calculations },
        { [calculationId]: calculation },
        { ...AppProvider.DEFAULT_STATE.calculations }
      );

      this.setState({ calculations: newCalculations }, () => {
        this.updateLocalStorage() && this.context.router.history.push('/');
      });
    };
  }

  updateLocalStorage = () => {
    const { calculations = {} } = this.state;
    window.localStorage.setItem(AppProvider.LOCAL_STORAGE_KEY, JSON.stringify({ calculations }));
  }

  render () {
    return (
      <AppContext.Provider value={{
        localization,
        repository,

        calculations: this.state.calculations,

        getCalculation: this.getCalculation,
        updateCalculation: this.updateCalculation,
        saveCalculation: this.saveCalculation
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.any
};

const AppProviderWithRouter = withRouter(AppProvider);

export { AppProviderWithRouter, AppProvider, AppContext };
