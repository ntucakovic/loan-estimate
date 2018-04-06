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

  showSaveCalculation = (calculation) => {
    return calculation && !calculation.id && calculation.monthlyRate;
  }

  render () {
    return (
      <AppContext.Consumer>
        {({ localization, calculations, getCalculation, updateCalculation, saveCalculation }) => {
          const activeCalculationId = this.props.match.params.calculation || null;
          const calculation = getCalculation(activeCalculationId);

          let savedCalculations = {};
          Object.keys(calculations).map((id) => {
            const current = calculations[id];

            if (current.id) {
              savedCalculations[current.id] = current;
            }
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

                  {this.showSaveCalculation(calculation) && (
                    <div className='credit-input__cta'>
                      <button
                        onClick={saveCalculation(activeCalculationId)}>{calculation.id ? localization.saveCalculationChanges : localization.saveCalculation}</button>
                    </div>
                  )}
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
