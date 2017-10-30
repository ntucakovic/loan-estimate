import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VariationsResult from '../VariationsResult';
import CreditCalculation from '../CreditCalculation';
import LocalizedStrings from 'react-localization';

class Variations extends Component {
  constructor (props) {
    super(props);

    this.variationProperties = ['squareMeterPrice', 'flatSize', 'interest'];

    // 100 / (1 / (X-1))
    this.variationsIncrements = [0.80, 0.85, 0.90, 0.95, 1.05, 1.10, 1.15, 1.20];

    this.defaultVariations = {};
    this.variationProperties.forEach((property) => {
      this.variationsIncrements.forEach((incrementMultiplier) => {
        this.defaultVariations[`${property}-${incrementMultiplier}`] = null;
      });
    });

    this.state = {
      variations: {}
    };
  }

  componentDidMount () {
    this.generateVariations(this.props);
  }

  /**
   * @todo This is being called two times for each prop update.
   */
  componentWillReceiveProps (nextProps) {
    this.generateVariations(nextProps);
  }

  createCreditCalculation (props, refKey) {
    return (
      <CreditCalculation
        key={refKey}
        ref={(creditCalculation) => { this[refKey] = creditCalculation; }}

        squareMeterPrice={props.squareMeterPrice}
        flatSize={props.flatSize}
        depositPercentage={props.depositPercentage}
        interest={props.interest}
        term={props.term} />
    );
  }

  generateVariations (props) {
    if (!props.ready) {
      this.setState({
        variations: {}
      });

      return;
    }

    let variations = {};
    this.variationProperties.forEach((property) => {
      this.variationsIncrements.forEach((incrementMultiplier) => {
        let creditCalculationProps = Object.assign({}, props, { [property]: props[property] * incrementMultiplier });
        let refKey = `${property}-${incrementMultiplier}`;

        variations[refKey] = this.createCreditCalculation(creditCalculationProps, refKey);
      });
    });

    this.setState({
      variations: variations
    }, () => {
      this.updateVariationsResult();
    });
  }

  updateVariationsResult () {
    let keys = Object.keys(this.state.variations);
    let results = {};

    keys.forEach((key) => {
      let [ variable, amount ] = key.split('-');
      results[variable] = results[variable] || {};
      results[variable][amount] = {
        props: this[key].getInputs(),
        result: this[key].getResult()
      };
    });

    this.variationsResult.variations = results;
  }

  render () {
    if (!this.state.variations || !Object.keys(this.state.variations).length) {
      return null;
    }

    const variations = Object.keys(this.state.variations).map((key) => {
      return this.state.variations[key];
    });

    return (
      <div id='variations' className='variations-result'>
        {variations}

        <VariationsResult
          ref={(variationsResult) => { this.variationsResult = variationsResult; }}
          localizedStrings={this.props.localizedStrings} />
      </div>
    );
  }
}

Variations.propTypes = {
  localizedStrings: PropTypes.instanceOf(LocalizedStrings),
  ready: PropTypes.bool,
  squareMeterPrice: PropTypes.any,
  flatSize: PropTypes.any,
  depositPercentage: PropTypes.any,
  interest: PropTypes.any,
  term: PropTypes.any
};

export default Variations;
