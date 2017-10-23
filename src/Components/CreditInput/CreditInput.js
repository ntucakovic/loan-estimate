import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocalizedStrings from 'react-localization';
import CreditCalculation from '../CreditCalculation';
import CreditCalculationResult from '../CreditCalculationResult/CreditCalculationResult';

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
    };

    this.state = this.getDefaultState();
    this.strings = this.props.localizedStrings;

    this.updateCreditCalculation.bind(this);
  }

  componentDidMount () {
    this.creditCalculation.calculateCreditOutput(this.creditCalculation.props);
  }

  getDefaultState () {
    let storageState = window.localStorage.getItem('creditCalculation');

    if (storageState) {
      storageState = JSON.parse(storageState);
    }

    let defaultState = {
      squareMeterPrice: '',
      flatSize: '',
      depositPercentage: 20,
      interest: 3,
      term: 30
    };

    Object.assign(defaultState, this.creditCalculationDefaultState);

    return storageState || defaultState;
  }

  updateCreditCalculation (event, creditCalculationProp) {
    this.setState({
      [creditCalculationProp]: event.target.value
    }, () => {
      this.setState(this.creditCalculation.state.output, () => {
        // Update localStorage each time calculation is finished.
        window.localStorage.setItem('creditCalculation', JSON.stringify(this.state));
      });
    });
  }

  render () {
    return (
      <div className='credit-input'>
        <label htmlFor='squareMeterPrice' className='credit-input__label'>
          {this.strings.squareMeterPrice}

          <input
            id='squareMeterPrice'
            className='credit-input__input'
            type='number' min='0' step='50'
            value={this.state.squareMeterPrice}
            onChange={(event) => { this.updateCreditCalculation(event, 'squareMeterPrice'); }} />
        </label>
        <label htmlFor='flatSize' className='credit-input__label'>
          {this.strings.flatSize}

          <input
            id='flatSize'
            className='credit-input__input'
            type='number' min='0'
            value={this.state.flatSize}
            onChange={(event) => { this.updateCreditCalculation(event, 'flatSize'); }} />
        </label>
        <label htmlFor='depositPercentage' className='credit-input__label'>
          {this.strings.depositPercentage}

          <input
            id='depositPercentage'
            className='credit-input__input'
            type='number' min='0' max='100' step='0.1'
            value={this.state.depositPercentage}
            onChange={(event) => { this.updateCreditCalculation(event, 'depositPercentage'); }} />
        </label>
        <label htmlFor='interest' className='credit-input__label'>
          {this.strings.interest}

          <input
            id='interest'
            className='credit-input__input'
            type='number' min='0' max='100' step='0.1'
            value={this.state.interest}
            onChange={(event) => { this.updateCreditCalculation(event, 'interest'); }} />
        </label>
        <label htmlFor='term' className='credit-input__label'>
          {this.strings.term}

          <input
            id='term'
            className='credit-input__input'
            type='number' min='0' max='30' step='1'
            value={this.state.term}
            onChange={(event) => { this.updateCreditCalculation(event, 'term'); }} />
        </label>

        <CreditCalculation
          ref={(creditCalculation) => { this.creditCalculation = creditCalculation; }}

          squareMeterPrice={this.state.squareMeterPrice}
          flatSize={this.state.flatSize}
          depositPercentage={this.state.depositPercentage}
          interest={this.state.interest}
          term={this.state.term}
        />

        <CreditCalculationResult
          localizedStrings={this.props.localizedStrings}
          flatPrice={this.state.flatPrice}
          depositTotal={this.state.depositTotal}
          loanTotal={this.state.loanTotal}
          monthTotal={this.state.monthTotal}
          monthlyRate={this.state.monthlyRate} />
      </div>
    );
  }
}

CreditInput.propTypes = {
  localizedStrings: PropTypes.instanceOf(LocalizedStrings)
};

export default CreditInput;
