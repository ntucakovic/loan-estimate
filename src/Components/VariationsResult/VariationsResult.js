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
      <td>{this.props.localizedStrings.variable}</td>
    ];

    let tableContent = [];
    let headingsSet = false;
    Object.entries(this.state.variations).forEach(([variableName, amounts]) => {
      const rows = [];
      Object.entries(amounts).forEach(([amount, variation]) => {
        let row = [
          <td>
            {this.props.localizedStrings[variableName]} {VariationsResult.getHumanPercentage(amount)}
          </td>
        ];
        Object.entries(Object.assign({}, variation.result, variation.props)).forEach(([propName, value]) => {
          if (!headingsSet) {
            headings.push(
              <td>
                {this.props.localizedStrings[propName]}
              </td>
            );
          }

          row.push(
            <td>
              {this.getValidNumber(propName, value)}
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
        <div>
          <table className='table' style={{color: '#fff'}}>
            <thead>
              <tr>
                {headings}
              </tr>
            </thead>
            <tbody>
              {table.rows}
            </tbody>
          </table>
        </div>
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
