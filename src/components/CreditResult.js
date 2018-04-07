import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { numberFormat } from '../modules/helperFunctions';

class CreditResult extends Component {
  static getPropValue = (propValue) => {
    let value = '-';

    if (propValue) {
      const decimals = (Math.round(propValue) === parseInt(propValue, 10)) ? 0 : 2;
      value = numberFormat(propValue, decimals);
    }

    return value;
  }

  render () {
    const { calculation = {}, localization } = this.props;
    const { totalAmount, loanTotal, depositTotal, monthTotal, monthlyRate } = calculation;

    const showTotalAmount = (!calculation.totalAmountInput || calculation.totalAmountInput === 0) && calculation.totalAmount;

    return (
      <div className='credit-result'>
        <div className='form-field-group form-field-group--md-up'>
          {showTotalAmount && (
            <label className={`credit-result__detail ${totalAmount ? 'is-active' : ''}`}>
              {localization.totalAmount}
              <input className='credit-result__value' type='text' disabled value={CreditResult.getPropValue(totalAmount)} />
            </label>
          )}

          <label className={`credit-result__detail ${loanTotal ? 'is-active' : ''}`}>
            {localization.loanTotal}
            <input className='credit-result__value' type='text' disabled value={CreditResult.getPropValue(loanTotal)} />
          </label>

          <label className={`credit-result__detail ${depositTotal ? 'is-active' : ''}`}>
            {localization.depositTotal}
            <input className='credit-result__value' type='text' disabled value={CreditResult.getPropValue(depositTotal)} />
          </label>
        </div>
        <label className={`credit-result__detail ${monthlyRate ? 'is-active' : ''}`}>
          {localization.monthlyRate}
          <input className='credit-result__value' type='text' disabled value={(() => {
            const rate = CreditResult.getPropValue(monthlyRate);
            const months = CreditResult.getPropValue(monthTotal);

            if (rate !== '-' && months !== '-') {
              return `${rate} x ${months} ${localization.months}`;
            }

            return '-';
          })()} />
        </label>
      </div>
    );
  }
}

CreditResult.propTypes = {
  localization: PropTypes.object.isRequired,
  calculation: PropTypes.shape({
    squareMeterPrice: PropTypes.string,
    flatSize: PropTypes.string,
    depositPercentage: PropTypes.string,
    interest: PropTypes.string,
    term: PropTypes.string,
    totalAmount: PropTypes.number,
    depositTotal: PropTypes.number,
    loanTotal: PropTypes.number,
    monthTotal: PropTypes.number,
    monthlyRate: PropTypes.number
  })
};

CreditResult.defaultProps = {
  showTotalAmount: true,
  calculation: {
    totalAmount: null,
    loanTotal: null,
    depositTotal: null,
    monthTotal: null,
    monthlyRate: null
  }
};

export default CreditResult;
