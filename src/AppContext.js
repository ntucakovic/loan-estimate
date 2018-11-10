import getSymbolFromCurrency from "currency-symbol-map";
import PropTypes from "prop-types";
import React from "react";

import CreditForm from "./components/CreditForm";
import CreditCalculation from "./modules/CreditCalculation";
import { repository } from "./modules/data";
import { getLanguage } from "./modules/helperFunctions";

import localization from "./modules/Localization";

const AppContext = React.createContext();

class AppProvider extends React.Component {
  static DEFAULT_STATE = {
    calculations: {
      draft: { ...CreditForm.DEFAULT_PARAMETERS }
    },
    defaultCurrency: "EUR"
  };

  static LOCAL_STORAGE_KEY = "CREDIT_CALCULATIONS";
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    // Set language.
    localization.setLanguage(getLanguage());

    let state = { ...AppProvider.DEFAULT_STATE };

    try {
      const storage = window.localStorage.getItem(
        AppProvider.LOCAL_STORAGE_KEY
      );
      const storageJson = JSON.parse(storage);

      if (storageJson) {
        const calculations = Object.assign(
          {},
          { ...AppProvider.DEFAULT_STATE.calculations },
          { ...storageJson.calculations }
        );
        const {
          defaultCurrency = AppProvider.DEFAULT_STATE.defaultCurrency
        } = storageJson;
        state = { calculations, defaultCurrency };
      }
    } catch (e) {
      // Local Storage doesn't exist.
    }

    this.state = state;
  }

  getCalculation = calculationId => {
    const { calculations } = this.state;

    if (calculationId) {
      return calculations[calculationId] || null;
    }

    return calculations["draft"];
  };

  saveCalculation = (calculationId = null) => {
    return () => {
      // Get current calculation state.
      const { ...calculation } = this.getCalculation(calculationId);

      // Set calculation ID if doesn't exist.
      calculationId = calculationId || new Date().getTime();
      let { calculations } = this.state;

      const name = window.prompt(
        localization.getString(
          "chooseCalculationName",
          localization.getLanguage()
        ),
        calculation.name || ""
      );

      if (!name) {
        return;
      }

      calculation.id = calculationId;
      calculation.name = name;

      // Update existing calculations.
      calculations = Object.assign(
        {},
        // Add previous calculations.
        { ...calculations },
        // Add new calculation.
        { [calculationId]: calculation },
        // Override draft calculation.
        { ...AppProvider.DEFAULT_STATE.calculations }
      );

      this.setState({ calculations }, () => {
        this.updateLocalStorage() && this.context.router.history.push("/");
      });
    };
  };

  updateCalculation = (calculationId = null) => {
    return event => {
      const calculationKey = calculationId || "draft";

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
        // Add previous calculations.
        { ...calculations },
        // Update existing calculation.
        { [calculationKey]: calculation }
      );

      this.setState(
        {
          calculations
        },
        this.updateLocalStorage
      );
    };
  };

  removeCalculation = (calculationId = null) => {
    return () => {
      let { calculations = {} } = this.state;

      if (calculations.hasOwnProperty(calculationId)) {
        delete calculations[calculationId];
      }

      this.setState({ calculations }, () => {
        this.updateLocalStorage() && this.context.router.history.push("/");
      });
    };
  };

  setDefaultCurrency = currencyInput => {
    const currency = getSymbolFromCurrency(currencyInput);

    if (currency) {
      this.setState(
        { defaultCurrency: currencyInput },
        this.updateLocalStorage
      );
    }
  };

  updateLocalStorage = () => {
    try {
      const { calculations = {}, defaultCurrency } = this.state;
      window.localStorage.setItem(
        AppProvider.LOCAL_STORAGE_KEY,
        JSON.stringify({ calculations, defaultCurrency })
      );
    } catch (e) {
      // Local storage doesn't exist.
    }
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          localization,
          repository,

          calculations: this.state.calculations,

          getCalculation: this.getCalculation,
          saveCalculation: this.saveCalculation,
          removeCalculation: this.removeCalculation,
          updateCalculation: this.updateCalculation,

          defaultCurrency: this.state.defaultCurrency,
          setDefaultCurrency: this.setDefaultCurrency
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.any
};

export { AppProvider, AppContext };
