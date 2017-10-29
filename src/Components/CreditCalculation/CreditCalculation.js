import { Component } from 'react';

class CreditCalculation extends Component {
  constructor (props) {
    super(props);

    this.defaultOutputState = {
      flatPrice: null,
      depositTotal: null,
      loanTotal: null,
      monthTotal: null,
      monthlyRate: null
    };

    this.state = {
      output: this.calculateCreditOutput(props)
    };
  }

  getInputs () {
    let { ref, ...input } = this.props;
    return input;
  }

  getResult () {
    return this.state.output;
  }

  render () {
    return null;
  }

  componentWillReceiveProps (nextProps) {
    let output = Object.assign({}, this.defaultOutputState, this.calculateCreditOutput(nextProps));
    this.setState({
      output: output
    });
  }

  calculateCreditOutput (props) {
    let output = {};

    let {
      squareMeterPrice = null,
      flatSize = null,
      depositPercentage = null,
      interest = null,
      term = null
    } = props;

    /**
     * Define as much of output as possible, as props arrive.
     * That gives ability to return information as they arrive.
     */
    (() => {
      if (!(squareMeterPrice && flatSize)) {
        return;
      }

      output.flatPrice = squareMeterPrice * flatSize;

      if (!depositPercentage) {
        return;
      }

      output.depositTotal = output.flatPrice * (depositPercentage / 100);
      output.loanTotal = output.flatPrice - output.depositTotal;

      if (!term) {
        return;
      }

      output.monthTotal = term * 12;

      if (!interest) {
        return;
      }

      interest = interest / 1200;

      output.monthlyRate = Math.ceil(
        output.loanTotal * (interest) / (1 - (Math.pow(1 / (1 + (interest)), output.monthTotal)))
      );
    })();

    return output;
  }
}

CreditCalculation.defaultProps = {
  squareMeterPrice: 0,
  flatSize: 0,
  depositPercentage: 2,
  interest: 3,
  term: 30
};

export default CreditCalculation;
