import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { numberFormat } from '../modules/helperFunctions';

class CreditCalculationResult extends Component {
  render () {
    const { calculation = {}, localization } = this.props;

    return (
      <div className='credit-calculation-result'>
        {
          Object.keys(CreditCalculationResult.defaultProps.calculation).map((key) => {
            let title = localization[key];
            let value = '-';

            const propValue = calculation[key];
            if (propValue) {
              const decimals = (Math.round(propValue) === parseInt(propValue, 10)) ? 0 : 2;
              value = numberFormat(propValue, decimals);
            }

            return (
              <label className={`credit-calculation-result__detail${propValue ? ' is-active' : ''}`} key={key}>
                {title}

                <input className='credit-calculation-result__value' type='text' disabled value={value} />
              </label>
            );
          })
        }
      </div>
    );
  }
}

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
