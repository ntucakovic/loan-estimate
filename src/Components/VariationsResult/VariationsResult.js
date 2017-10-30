import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocalizedStrings from 'react-localization';
import { numberFormat } from '../../NumberFormat';

class VariationsResult extends Component {
  constructor (props) {
    super(props);

    this.state = {
      variations: {}
    };

    this.skipRounding = ['monthlyRate', 'term'];
    this.columnOrder = ['squareMeterPrice', 'flatSize', 'depositPercentage', 'interest', 'term', 'flatPrice', 'depositTotal', 'loanTotal', 'monthlyRate'];
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
          <td className='variations-result__variable' data-prefix={`${this.props.localizedStrings.variable}: ${this.props.localizedStrings[variableName]}`}>
            <span>{this.props.localizedStrings[amount < 1 ? 'decreasedBy' : 'increasedBy']} </span>
            <span>{ VariationsResult.getHumanPercentage(amount).replace('-', '') }</span>
          </td>
        ];
        let columns = Object.assign({}, variation.result, variation.props);
        this.columnOrder.forEach((column) => {
          if (!headingsSet) {
            headings.push(
              <th>
                {this.props.localizedStrings[`${column}Short`] || this.props.localizedStrings[column]}
              </th>
            );
          }

          row.push(
            <td data-column={this.props.localizedStrings[column]}>
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
            {this.props.localizedStrings[keys[i]]}
          </button>
        );
      }

      return array;
    })(Object.keys(this.state.variations));

    return (
      <div className='variations-result__wrapper'>
        <div className='variations-result__tabs'>
          <label htmlFor='btn-squareMeterPrice'>{this.props.localizedStrings['chooseModifierPlaceholder']}</label>
          {buttons}
        </div>
        {tables}
      </div>
    );
  }
}

VariationsResult.propTypes = {
  localizedStrings: PropTypes.instanceOf(LocalizedStrings)
};

export default VariationsResult;
