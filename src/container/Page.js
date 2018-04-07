import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Transition } from 'react-transition-group';

import { AppContext } from '../AppContext';
import CreditForm from '../components/CreditForm';
import CreditResult from '../components/CreditResult';
import CreditNavigation from '../components/CreditNavigation';
import Share from '../components/Share';
import { share } from '../modules/data';

class Page extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static ADD_ACTION = 'ADD_ACTION';
  static REMOVE_ACTION = 'REMOVE_ACTION';

  getAvailableAction = (calculation) => {
    if (calculation && !calculation.id && calculation.monthlyRate) {
      return Page.ADD_ACTION;
    }

    if (calculation && calculation.id) {
      return Page.REMOVE_ACTION;
    }
  }

  render () {
    return (
      <AppContext.Consumer>
        {({ localization, calculations, getCalculation, saveCalculation, updateCalculation, removeCalculation }) => {
          const activeCalculationId = this.props.match.params.calculation || null;
          const calculation = getCalculation(activeCalculationId);
          const action = this.getAvailableAction(calculation);
          const showAdd = (action === Page.ADD_ACTION);

          let actionModifier;
          switch (action) {
            case Page.ADD_ACTION:
              actionModifier = 'add';
              break;
            case Page.REMOVE_ACTION:
              actionModifier = 'remove';
              break;
            default:
              actionModifier = '';
              break;
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
                <CreditNavigation calculations={savedCalculations} localization={localization} />
              )}

              <div className='app__scroll'>
                <CreditForm
                  localization={localization}
                  calculation={calculation}
                  updateCalculation={updateCalculation}
                >
                  <CreditResult
                    localization={localization}
                    calculation={calculation} />

                  <Transition
                    in={showAdd}
                    timeout={300}
                    mountOnEnter>
                    {state => (
                      <div className={`credit-input__cta credit-input__cta--add ${state}`}>
                        <button key='add' className={`credit-input__button credit-input__button--add ${state}`} onClick={saveCalculation(activeCalculationId)}>
                          {localization.saveCalculation}
                        </button>
                      </div>
                    )}
                  </Transition>

                  {action === Page.REMOVE_ACTION && (
                    <div className={`credit-input__cta credit-input__cta--remove`}>
                      <button key={actionModifier} className={`credit-input__button credit-input__button--remove`} onClick={removeCalculation(activeCalculationId)}>
                        {localization.deleteCalculation}
                      </button>
                    </div>
                  )}
                </CreditForm>
              </div>
              <Share {...share} localization={localization} />
            </React.Fragment>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

Page.propTypes = {
  match: PropTypes.object
};

export default Page;
