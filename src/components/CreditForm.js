import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import getSymbolFromCurrency from 'currency-symbol-map';

class CreditForm extends Component {
  static TRANSITION_DURATION = 300;
  static LABEL_HEIGHT = 68;
  static ALLOWED_CURRENCIES = ['EUR', 'USD', 'GBP'];

  static DEFAULT_TRANSITION_STYLE = {
    transition: `opacity ${CreditForm.TRANSITION_DURATION}ms ease-in-out, max-height ${CreditForm.TRANSITION_DURATION}ms ease-in-out, transform ${CreditForm.TRANSITION_DURATION}ms ease-in-out`,
    opacity: 0,
    maxHeight: 0,
    transform: `translateX(100%)`
  }

  static DEFAULT_PARAMETERS = {
    squareMeterPrice: '',
    flatSize: '',
    depositPercentage: '',
    interest: '',
    term: ''
  }

  getTransitionStyles = (state) => {
    const transitionStyles = {
      entering: {
        opacity: 0,
        maxHeight: 0,
        transform: `translateX(100%)`
      },
      entered: {
        opacity: 1,
        maxHeight: CreditForm.LABEL_HEIGHT,
        transform: `translateX(0)`
      }
    };

    return {
      ...CreditForm.DEFAULT_TRANSITION_STYLE,
      ...transitionStyles[state]
    };
  }

  setDefaultCurrency = (event) => {
    const { setDefaultCurrency } = this.props;

    setDefaultCurrency(event.target.value);
  }

  render () {
    const { calculation = {}, localization, updateCalculation, defaultCurrency } = this.props;
    const showTotalAmountInput = !(calculation.squareMeterPrice && calculation.flatSize);
    const showAlternativeInputs = !calculation.totalAmountInput;
    const usedCurrency = calculation.currency || defaultCurrency;

    return (
      <React.Fragment>
        <div className='credit-input' key='credit-input'>
          <Transition
            in={showTotalAmountInput}
            timeout={300}
            mountOnEnter
            unmountOnExit>
            {state => (
              <div style={{
                ...this.getTransitionStyles(state)
              }}>
                <div className='form-field-group'>
                  <label htmlFor='squareMeterPrice' className='form-label form-label--with-prefix' data-prefix={getSymbolFromCurrency(usedCurrency)}>
                    <span>{localization.totalAmount}</span>

                    <input
                      id='totalAmountInput'
                      name='totalAmountInput'
                      className='form-input'
                      type='number' min='0' step='50'
                      value={calculation.totalAmountInput || ''}
                      onChange={updateCalculation(calculation.id)} />
                  </label>

                  <label htmlFor='currency' className='form-label'>
                    <span>{localization.currency}</span>

                    <select name='currency' id='currency' onChange={(event) => {
                      this.setDefaultCurrency(event);
                      updateCalculation(calculation.id)(event);
                    }} defaultValue={usedCurrency}>
                      {CreditForm.ALLOWED_CURRENCIES.map(currentCurrency => (
                        <option
                          key={currentCurrency}
                          value={currentCurrency}>{getSymbolFromCurrency(currentCurrency)}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            )}
          </Transition>

          <Transition
            in={showAlternativeInputs}
            timeout={300}
            mountOnEnter
            unmountOnExit>
            {state => (
              <div className={`form-field-group ${state}`} style={{
                ...this.getTransitionStyles(state)
              }}>
                <label htmlFor='flatSize' className='form-label'>
                  <span>{localization.flatSize}</span>

                  <input
                    id='flatSize'
                    name='flatSize'
                    className='form-input'
                    type='number' min='0'
                    value={calculation.flatSize || ''}
                    onChange={updateCalculation(calculation.id)} />
                </label>

                <label htmlFor='squareMeterPrice' className='form-label form-label--with-prefix' data-prefix={getSymbolFromCurrency(usedCurrency)}>
                  <span>{localization.squareMeterPrice}</span>

                  <input
                    id='squareMeterPrice'
                    name='squareMeterPrice'
                    className='form-input'
                    type='number' min='0' step='50'
                    value={calculation.squareMeterPrice || ''}
                    onChange={updateCalculation(calculation.id)} />
                </label>

                {!showTotalAmountInput && (
                  <label htmlFor='currency' className='form-label'>
                    <span>{localization.currency}</span>

                    <select name='currency' id='currency' onChange={(event) => {
                      this.setDefaultCurrency(event);
                      updateCalculation(calculation.id)(event);
                    }} defaultValue={usedCurrency}>
                      {CreditForm.ALLOWED_CURRENCIES.map(currentCurrency => (
                        <option
                          key={currentCurrency}
                          value={currentCurrency}>{getSymbolFromCurrency(currentCurrency)}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
            )}
          </Transition>

          <div className='form-field-group form-field-group--md-up'>
            <div className='form-field-group'>
              <label htmlFor='depositPercentage' className='form-label form-label--with-prefix' data-prefix='%'>
                <span>{localization.depositPercentage}</span>

                <input
                  id='depositPercentage'
                  name='depositPercentage'
                  className='form-input'
                  type='number' min='0' max='100' step='0.1'
                  value={calculation.depositPercentage || ''}
                  onChange={updateCalculation(calculation.id)} />
              </label>
              <label htmlFor='interest' className='form-label form-label--with-prefix' data-prefix='%'>
                <span>{localization.interest}</span>

                <input
                  id='interest'
                  name='interest'
                  className='form-input'
                  type='number' min='0' max='100' step='0.1'
                  value={calculation.interest || ''}
                  onChange={updateCalculation(calculation.id)} />
              </label>
            </div>

            <label htmlFor='term' className='form-label'>
              <span>{localization.term}</span>

              <input
                id='term'
                name='term'
                className='form-input'
                type='number' min='0' max='30' step='1'
                value={calculation.term || ''}
                onChange={updateCalculation(calculation.id)} />
            </label>
          </div>

          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

CreditForm.propTypes = {
  updateCalculation: PropTypes.func,
  localization: PropTypes.object,
  calculation: PropTypes.shape(),
  children: PropTypes.any,
  defaultCurrency: PropTypes.string,
  setDefaultCurrency: PropTypes.func
};

export default CreditForm;
