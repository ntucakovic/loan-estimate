import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { numberFormat } from '../modules/helperFunctions';

class CreditCalculationResult extends Component {
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

    return (
      <div className='credit-calculation-result'>
        <div className='credit-input__field-group credit-input__field-group--md-up'>
          <label className={`credit-calculation-result__detail ${totalAmount ? 'is-active' : ''}`}>
            {localization.totalAmount}
            <input className='credit-calculation-result__value' type='text' disabled value={CreditCalculationResult.getPropValue(totalAmount)} />
          </label>

          <label className={`credit-calculation-result__detail ${loanTotal ? 'is-active' : ''}`}>
            {localization.loanTotal}
            <input className='credit-calculation-result__value' type='text' disabled value={CreditCalculationResult.getPropValue(loanTotal)} />
          </label>

          <label className={`credit-calculation-result__detail ${depositTotal ? 'is-active' : ''}`}>
            {localization.depositTotal}
            <input className='credit-calculation-result__value' type='text' disabled value={CreditCalculationResult.getPropValue(depositTotal)} />
          </label>
        </div>
        <label className={`credit-calculation-result__detail ${monthlyRate ? 'is-active' : ''}`}>
          {localization.monthlyRate}
          <input className='credit-calculation-result__value' type='text' disabled value={(() => {
            const rate = CreditCalculationResult.getPropValue(monthlyRate);
            const months = CreditCalculationResult.getPropValue(monthTotal);

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
//
// function test () {
//   {
//     Object.keys(CreditCalculationResult.defaultProps.calculation).map((key) => {
//       let title = localization[key];
//       let value = '-';
//
//       const propValue = calculation[key];
//       if (propValue) {
//         const decimals = (Math.round(propValue) === parseInt(propValue, 10)) ? 0 : 2;
//         value = numberFormat(propValue, decimals);
//       }
//
//       return (
//         <label className={`credit-calculation-result__detail${propValue ? ' is-active' : ''}`} key={key}>
//           {title}
//
//           <input className='credit-calculation-result__value' type='text' disabled value={value} />
//         </label>
//       );
//     })
//   }
// }

CreditCalculationResult.propTypes = {
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

CreditCalculationResult.defaultProps = {
  calculation: {
    totalAmount: null,
    loanTotal: null,
    depositTotal: null,
    monthTotal: null,
    monthlyRate: null
  }
};

export default CreditCalculationResult;
