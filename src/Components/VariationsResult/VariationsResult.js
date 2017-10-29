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

  render () {
    const headings = [
      <th>{this.props.localizedStrings.variable}</th>
    ];

    let tableContent = [];
    let headingsSet = false;
    Object.entries(this.state.variations).forEach(([variableName, amounts]) => {
      const rows = [];
      Object.entries(amounts).forEach(([amount, variation]) => {
        let row = [
          <td className='variations-result__variable' data-prefix={this.props.localizedStrings.variable}>
            <span>{this.props.localizedStrings[variableName]} </span>
            <span>{VariationsResult.getHumanPercentage(amount)}</span>
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

    tableContent.forEach((table) => {
      tables.push(
        <table className='variations-result__table'>
          <thead>
            <tr>
              {headings}
            </tr>
          </thead>
          <tbody>
            {table.rows}
          </tbody>
        </table>
      );
    });

    return (
      <div>
        {tables}
      </div>
    );
  }
}

VariationsResult.propTypes = {
  localizedStrings: PropTypes.instanceOf(LocalizedStrings)
};

export default VariationsResult;
