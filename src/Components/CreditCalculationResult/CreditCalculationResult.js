import React, { Component } from 'react';

class CreditCalculationResult extends Component {
  constructor (props) {
    super(props);

    this.titles = {
      flatPrice: 'Cena nekretnine',
      depositTotal: 'Učešće',
      loanTotal: 'Iznos kredita',
      monthlyRate: 'Mesečna rata'
    }
  }

  render () {
    return (
      <div className='credit-calculation-result'>
        {
          Object.keys(this.titles).map((keyName) => {
            let title = this.titles[keyName];
            return (
              (
                <div className='credit-calculation-result__detail'  key={keyName}>
                  <div className='credit-calculation-result__title'>
                    <label>{title}</label>
                  </div>
                  <div className='credit-calculation-result__value'>
                    <input type="text" disabled value={this.props[keyName]}/>
                  </div>
                </div>
              )
            );
          })
        }
      </div>
    )
  }
}

CreditCalculationResult.defaultProps = {
  flatPrice: '-',
  depositTotal: '-',
  loanTotal: '-',
  monthTotal: '-',
  monthlyRate: '-'
}

export default CreditCalculationResult;