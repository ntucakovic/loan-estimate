import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

class CreditInput extends Component {
  static TRANSITION_DURATION = 300;
  static LABEL_HEIGHT = 68;

  static DEFAULT_TRANSITION_STYLE = {
    transition: `opacity ${CreditInput.TRANSITION_DURATION}ms ease-in-out, max-height ${CreditInput.TRANSITION_DURATION}ms ease-in-out, transform ${CreditInput.TRANSITION_DURATION}ms ease-in-out`,
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
        maxHeight: CreditInput.LABEL_HEIGHT,
        transform: `translateX(0)`
      }
    };

    return {
      ...CreditInput.DEFAULT_TRANSITION_STYLE,
      ...transitionStyles[state]
    };
  }

  render () {
    const { calculation = {}, localization, updateCalculation } = this.props;
    const showTotalAmountInput = !(calculation.squareMeterPrice && calculation.flatSize);
    const showAlternativeInputs = !calculation.totalAmountInput;

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
                <label htmlFor='squareMeterPrice' className={`credit-input__label`}>
                  {localization.totalAmount}

                  <input
                    id='totalAmountInput'
                    name='totalAmountInput'
                    className='credit-input__input'
                    type='number' min='0' step='50'
                    value={calculation.totalAmountInput || ''}
                    onChange={updateCalculation(calculation.id)} />
                </label>
              </div>
            )}
          </Transition>

          <Transition
            in={showAlternativeInputs}
            timeout={300}
            mountOnEnter
            unmountOnExit>
            {state => (
              <div className={`credit-input__field-group ${state}`} style={{
                ...this.getTransitionStyles(state)
              }}>
                <label htmlFor='flatSize' className='credit-input__label'>
                  {localization.flatSize}

                  <input
                    id='flatSize'
                    name='flatSize'
                    className='credit-input__input'
                    type='number' min='0'
                    value={calculation.flatSize || ''}
                    onChange={updateCalculation(calculation.id)} />
                </label>

                <label htmlFor='squareMeterPrice' className='credit-input__label'>
                  {localization.squareMeterPrice}

                  <input
                    id='squareMeterPrice'
                    name='squareMeterPrice'
                    className='credit-input__input'
                    type='number' min='0' step='50'
                    value={calculation.squareMeterPrice || ''}
                    onChange={updateCalculation(calculation.id)} />
                </label>
              </div>
            )}
          </Transition>

          <label htmlFor='depositPercentage' className='credit-input__label'>
            {localization.depositPercentage}

            <input
              id='depositPercentage'
              name='depositPercentage'
              className='credit-input__input'
              type='number' min='0' max='100' step='0.1'
              value={calculation.depositPercentage || ''}
              onChange={updateCalculation(calculation.id)} />
          </label>
          <label htmlFor='interest' className='credit-input__label'>
            {localization.interest}

            <input
              id='interest'
              name='interest'
              className='credit-input__input'
              type='number' min='0' max='100' step='0.1'
              value={calculation.interest || ''}
              onChange={updateCalculation(calculation.id)} />
          </label>
          <label htmlFor='term' className='credit-input__label'>
            {localization.term}

            <input
              id='term'
              name='term'
              className='credit-input__input'
              type='number' min='0' max='30' step='1'
              value={calculation.term || ''}
              onChange={updateCalculation(calculation.id)} />
          </label>

          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

CreditInput.propTypes = {
  updateCalculation: PropTypes.func,
  localization: PropTypes.object,
  calculation: PropTypes.shape(),
  children: PropTypes.any
};

export default CreditInput;
