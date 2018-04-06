import React, { Component } from 'react';
import { numberFormat } from '../NumberFormat';

class VariationsResult extends Component {
  constructor (props, context) {
    super(props);

    this.state = {
      variations: {}
    };

    this.skipRounding = ['monthlyRate', 'term'];
    this.columnOrder = ['squareMeterPrice', 'flatSize', 'depositPercentage', 'interest', 'term', 'flatPrice', 'depositTotal', 'loanTotal', 'monthlyRate'];

    this.localization = context.localization;
  }

  get variations () {
    return this.state.variations;
  }

  set variations (variations) {
    this.setState({
      variations: variations
    });
  }

  getValidNumber (propName, value) {
    if (value) {
      if (!this.skipRounding.includes(propName)) {
        return numberFormat(value, 2);
      }

      return value;
    }

    return '-';
  }

  static getHumanPercentage (number) {
    return Math.round(100 / (1 / (number - 1))) + '%';
  }

  toggleVariationTable (e) {
    let tableId = e.target.id.replace('btn-', 'table-');

    let table = document.getElementById(tableId);
    table.parentNode.childNodes.forEach((sibling) => {
      sibling.classList.remove('is-active');
    });
    table.classList.add('is-active');

    let button = e.target;
    button.parentNode.childNodes.forEach((sibling) => {
      sibling.classList.remove('is-active');
    });
    button.classList.add('is-active');
  }

  render () {
    if (!this.state.variations || !Object.keys(this.state.variations).length) {
      return null;
    }

    const headings = [
      <th />
    ];

    let tableContent = [];
    let headingsSet = false;
    Object.entries(this.state.variations).forEach(([variableName, amounts]) => {
      const rows = [];
      Object.entries(amounts).forEach(([amount, variation]) => {
        let row = [
          <td className='variations-result__variable' data-prefix={`${this.localization.variable}: ${this.localization[variableName]}`}>
            <span>{this.localization[amount < 1 ? 'decreasedBy' : 'increasedBy']} </span>
            <span>{ VariationsResult.getHumanPercentage(amount).replace('-', '') }</span>
          </td>
        ];
        let columns = Object.assign({}, variation.result, variation.props);
        this.columnOrder.forEach((column) => {
          if (!headingsSet) {
            headings.push(
              <th>
                {this.localization[`${column}Short`] || this.localization[column]}
              </th>
            );
          }

          row.push(
            <td data-column={this.localization[column]}>
              {this.getValidNumber(column, columns[column])}
            </td>
          );
        });

        rows.push(
          <tr>
            {row}
          </tr>
        );

        headingsSet = true;
      });

      tableContent.push({
        variableName: variableName,
        rows: rows
      });
    });

    let tables = [];

    for (let i = 0; i < tableContent.length; i++) {
      tables.push(
        <table id={`table-${tableContent[i].variableName}`} className={`variations-result__table${i === 0 ? ' is-active': ''}`}>
          <thead>
            <tr>
              {headings}
            </tr>
          </thead>
          <tbody>
            {tableContent[i].rows}
          </tbody>
        </table>
      );
    }

    const buttons = ((keys) => {
      let array = [];

      for (let i = 0; i < keys.length; i++) {
        array.push(
          <button id={`btn-${keys[i]}`} className={`tabs__button ${i === 0 ? 'is-active' : ''}`}
            onClick={this.toggleVariationTable}>
            {this.localization[keys[i]]}
          </button>
        );
      }

      return array;
    })(Object.keys(this.state.variations));

    return (
      <div className='variations-result__wrapper'>
        <div className='variations-result__tabs'>
          <label htmlFor='btn-squareMeterPrice'>{this.localization.chooseModifierPlaceholder}</label>
          {buttons}
        </div>
        {tables}
      </div>
    );
  }
}

export default VariationsResult;
