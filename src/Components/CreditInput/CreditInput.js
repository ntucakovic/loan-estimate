import React, { Component } from 'react';
import CreditCalculation from '../CreditCalculation';

class CreditInput extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='credit-input'>
        <table className='credit-input__table'>
          <tr>
            <td><label htmlFor="squareMeterPrice" className='credit-input__label'>Cena m²</label></td>
            <td><input id='squareMeterPrice' className='credit-input__input' /></td>
          </tr>
          <tr>
            <td><label htmlFor="flatSize" className='credit-input__label'>Nekretnina m²</label></td>
            <td><input id='flatSize' className='credit-input__input' /></td>
          </tr>
          <tr>
            <td><label htmlFor="depositPercentage" className='credit-input__label'>Depozit %</label></td>
            <td><input id='depositPercentage' className='credit-input__input' /></td>
          </tr>
          <tr>
            <td><label htmlFor="interest" className='credit-input__label'>Kamata %</label></td>
            <td><input id='interest' className='credit-input__input' /></td>
          </tr>
          <tr>
            <td><label htmlFor="term" className='credit-input__label'>Period otplate (godine)</label></td>
            <td><input id='term' className='credit-input__input' /></td>
          </tr>
        </table>
      </div>
    )
  }
}

export default CreditInput;