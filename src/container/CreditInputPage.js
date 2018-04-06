import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../AppContext';

import CreditInput from '../components/CreditInput';
import CreditCalculationResult from '../components/CreditCalculationResult';
import Calculations from '../components/Calculations';
import { Redirect } from 'react-router-dom';

class CreditInputPage extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static ADD_ACTION = 'ADD_ACTION';
  static REMOVE_ACTION = 'REMOVE_ACTION';

  getAvailableAction = (calculation) => {
    if (calculation && !calculation.id && calculation.monthlyRate) {
      return CreditInputPage.ADD_ACTION;
    }

    if (calculation && calculation.id) {
      return CreditInputPage.REMOVE_ACTION;
    }
  }

  render () {
    return (
      <AppContext.Consumer>
        {({ localization, calculations, getCalculation, saveCalculation, updateCalculation, removeCalculation }) => {
          const activeCalculationId = this.props.match.params.calculation || null;
          const calculation = getCalculation(activeCalculationId);
          const action = this.getAvailableAction(calculation);

          let actionModifier;
          switch (action) {
            case CreditInputPage.ADD_ACTION:
              actionModifier = 'add';
              break;
            case CreditInputPage.REMOVE_ACTION:
              actionModifier = 'remove';
              break;
            default:
              actionModifier = '';
          }

          let savedCalculations = {};
          Object.keys(calculations).map((id) => {
            const current = calculations[id];

            if (current.id) {
              savedCalculations[current.id] = current;
            }

            return id;
          });

          if (activeCalculationId && !calculation) {
            return <Redirect to={'/'} />;
          }

          return (
            <React.Fragment>
              {Object.keys(savedCalculations).length !== 0 && (
                <Calculations calculations={savedCalculations} />
              )}

              <div className='app__scroll'>
                <CreditInput
                  localization={localization}
                  calculation={calculation}
                  updateCalculation={updateCalculation}
                >
                  <CreditCalculationResult
                    localization={localization}
                    calculation={calculation} />

                  <div className={`credit-input__cta credit-input__cta--${actionModifier}`}>
                    {action === CreditInputPage.ADD_ACTION && (
                      <button className={`credit-input__button credit-input__button--${actionModifier}`} onClick={saveCalculation(activeCalculationId)}>
                        {localization.saveCalculation}
                      </button>
                    )}

                    {action === CreditInputPage.REMOVE_ACTION && (
                      <button className={`credit-input__button credit-input__button--${actionModifier}`} onClick={removeCalculation(activeCalculationId)}>
                        {localization.deleteCalculation}
                      </button>
                    )}
                  </div>
                </CreditInput>
              </div>
            </React.Fragment>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

CreditInputPage.propTypes = {
  match: PropTypes.object
};

export default CreditInputPage;
