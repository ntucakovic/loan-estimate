import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { AppContext } from '../AppContext';

class CreditInput extends Component {
  static DEFAULT_PARAMETERS = {
    squareMeterPrice: '',
    flatSize: '',
    depositPercentage: '',
    interest: '',
    term: ''
  }

  render () {
    const { calculation = {}, localization, updateCalculation } = this.props;

    return (
      <React.Fragment>
        <div className='credit-input' key='credit-input'>
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
