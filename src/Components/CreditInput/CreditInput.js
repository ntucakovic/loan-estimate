import React, { Component } from 'react';
import CreditCalculation from '../CreditCalculation';
import CreditCalculationResult from '../CreditCalculationResult/CreditCalculationResult'

class CreditInput extends Component {
  constructor (props) {
    super(props);

    this.creditCalculationDefaultState = {
      flatPrice: null,
      depositTotal: null,
      loanTotal: null,
      monthTotal: null,
      monthlyRate: null
    };

    // Make sure code doesn't break for referencing to undefined variables.
    this.creditCalculation = {
      state: this.creditCalculationDefaultState
    }

    this.state = this.getDefaultState();
  }

  getDefaultState () {
    let storageState = localStorage.getItem('creditCalculation');

    if (storageState) {
      storageState = JSON.parse(storageState);
    }

    let defaultState = {
      squareMeterPrice: null,
      flatSize: null,
      depositPercentage: 20,
      interest: 3,
      term: 30
    }

    Object.assign(defaultState, this.creditCalculationDefaultState);

    return storageState || defaultState;
  }

  updateCreditCalculation (creditCalculationProp, event) {
    this.setState({
      [creditCalculationProp]: event.target.value
    }, () => {
      this.setState(this.creditCalculation.state.output, () => {
        // Update localStorage each time calculation is finished.
        localStorage.setItem('creditCalculation', JSON.stringify(this.state));
      });
    });
  }

  render () {
    return (
      <div className='credit-input'>
        <table className='credit-input__table'>
          <tbody>
            <tr>
              <td><label htmlFor="squareMeterPrice" className='credit-input__label'>Cena m²</label></td>
            </tr>
            <tr>
              <td>
                <input
                  className='credit-input__input'
                  type='number' min='0' step='50'
                  value={this.state.squareMeterPrice}
                  onChange={this.updateCreditCalculation.bind(this, 'squareMeterPrice')} />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="flatSize" className='credit-input__label'>Nekretnina m²</label></td>
            </tr>
            <tr>
              <td>
                <input
                  className='credit-input__input'
                  type='number' min='0'
                  value={this.state.flatSize}
                  onChange={this.updateCreditCalculation.bind(this, 'flatSize')} />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="depositPercentage" className='credit-input__label'>Depozit %</label></td>
            </tr>
            <tr>
              <td>
                <input
                  className='credit-input__input'
                  type='number' min='0' max='100' step='0.1'
                  value={this.state.depositPercentage}
                  onChange={this.updateCreditCalculation.bind(this, 'depositPercentage')} />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="interest" className='credit-input__label'>Kamata %</label></td>
            </tr>
            <tr>
              <td>
                <input
                  className='credit-input__input'
                  type='number' min='0' max='100' step='0.1'
                  value={this.state.interest}
                  onChange={this.updateCreditCalculation.bind(this, 'interest')} />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="term" className='credit-input__label'>Period otplate (godine)</label></td>
            </tr>
            <tr>
              <td>
                <input
                  className='credit-input__input'
                  type='number' min='0' max='30' step='1'
                  value={this.state.term}
                  onChange={this.updateCreditCalculation.bind(this, 'term')} />
              </td>
            </tr>
          </tbody>
        </table>

        <CreditCalculation
          ref={(creditCalculation) => { this.creditCalculation = creditCalculation; }}

          squareMeterPrice={this.state.squareMeterPrice}
          flatSize={this.state.flatSize}
          depositPercentage={this.state.depositPercentage}
          interest={this.state.interest}
          term={this.state.term}
        />

        <CreditCalculationResult
          flatPrice={this.state.flatPrice}
          depositTotal={this.state.depositTotal}
          loanTotal={this.state.loanTotal}
          monthTotal={this.state.monthTotal}
          monthlyRate={this.state.monthlyRate} />
      </div>
    )
  }
}

export default CreditInput;