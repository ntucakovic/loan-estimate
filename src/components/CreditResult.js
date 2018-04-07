import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { numberFormat } from '../modules/helperFunctions';
import getSymbolFromCurrency from 'currency-symbol-map'

class CreditResult extends Component {
  static getPropValue = (propValue) => {
    let value = '-';

    if (propValue) {
      const decimals = (Math.round(propValue) === parseInt(propValue, 10)) ? 0 : 2;
      value = numberFormat(propValue, decimals);
    }

    return value;
  }

  static getPayoffDetails = (currency, monthlyRate, monthTotal, localizationMonths) => {
    const rate = CreditResult.getPropValue(monthlyRate);
    const months = CreditResult.getPropValue(monthTotal);
    const currencySymbol = getSymbolFromCurrency(currency);
    const isUSD = currency === 'USD';

    if (rate !== '-' && months !== '-') {
      return `${isUSD ? `${currencySymbol} ` : ''}${rate}${!isUSD ? ` ${currencySymbol}` : ''} x ${months} ${localizationMonths}`;
    }

    return '-';
  }

  render () {
    const { calculation = {}, localization, defaultCurrency } = this.props;
    const { totalAmount, loanTotal, depositTotal, monthTotal, monthlyRate } = calculation;
    const usedCurrency = calculation.currency || defaultCurrency;

    const showTotalAmount = (!calculation.totalAmountInput || calculation.totalAmountInput === 0) && calculation.totalAmount;

    return (
      <div className='credit-result'>
        <div className='form-field-group form-field-group--md-up'>
          {showTotalAmount && (
            <label className={`credit-result__detail ${totalAmount ? 'is-active' : ''} form-label form-label--with-prefix`} data-prefix={getSymbolFromCurrency(usedCurrency)}>
              {localization.totalAmount}
              <input className='credit-result__value form-input' type='text' disabled value={CreditResult.getPropValue(totalAmount)} />
            </label>
          )}

          <label className={`credit-result__detail ${loanTotal ? 'is-active' : ''} form-label form-label--with-prefix`} data-prefix={getSymbolFromCurrency(usedCurrency)}>
            {localization.loanTotal}
            <input className='credit-result__value form-input' type='text' disabled value={CreditResult.getPropValue(loanTotal)} />
          </label>

          <label className={`credit-result__detail ${depositTotal ? 'is-active' : ''} form-label form-label--with-prefix`} data-prefix={getSymbolFromCurrency(usedCurrency)}>
            {localization.depositTotal}
            <input className='credit-result__value form-input' type='text' disabled value={CreditResult.getPropValue(depositTotal)} />
          </label>
        </div>
        <label className={`credit-result__detail ${monthlyRate ? 'is-active' : ''}`}>
          {localization.monthlyRate}
          <input className='credit-result__value form-input' type='text' disabled value={CreditResult.getPayoffDetails(usedCurrency, monthlyRate, monthTotal, localization.months)} />
        </label>
      </div>
    );
  }
}

CreditResult.propTypes = {
  localization: PropTypes.object.isRequired,
  defaultCurrency: PropTypes.string,
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
