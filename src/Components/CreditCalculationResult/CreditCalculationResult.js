import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocalizedStrings from 'react-localization';

class CreditCalculationResult extends Component {
  constructor (props) {
    super(props);

    this.strings = this.props.localizedStrings;
  }

  render () {
    return (
      <div className='credit-calculation-result'>
        {
          Object.keys(CreditCalculationResult.defaultProps).map((keyName) => {
            let title = this.strings[keyName];
            return (
              (
                <label className={`credit-calculation-result__detail${this.props[keyName] ? ' is-active' : ''}`} key={keyName}>
                  {title}

                  <input className='credit-calculation-result__value' type='text' disabled value={this.props[keyName] || '-'} />
                </label>
              )
            );
          })
        }
      </div>
    );
  }
}

CreditCalculationResult.propTypes = {
  localizedStrings: PropTypes.instanceOf(LocalizedStrings)
};

CreditCalculationResult.defaultProps = {
  flatPrice: '-',
  depositTotal: '-',
  loanTotal: '-',
  monthlyRate: '-'
};

export default CreditCalculationResult;
