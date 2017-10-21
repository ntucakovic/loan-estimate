import React, { Component } from 'react';

class CreditCalculationResult extends Component {
  constructor (props) {
    super(props);

    this.titles = {
      flatPrice: 'Cena nekretnine',
      depositTotal: 'Učešće',
      loanTotal: 'Iznos kredita',
      monthlyRate: 'Mesečna rata'
    };
  }

  render () {
    return (
      <div className='credit-calculation-result'>
        {
          Object.keys(this.titles).map((keyName) => {
            let title = this.titles[keyName];
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

CreditCalculationResult.defaultProps = {
  flatPrice: '-',
  depositTotal: '-',
  loanTotal: '-',
  monthTotal: '-',
  monthlyRate: '-'
};

export default CreditCalculationResult;
