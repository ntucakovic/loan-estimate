class CreditCalculation {
  static DEFAULT_RESULTS = {
    flatPrice: null,
    depositTotal: null,
    loanTotal: null,
    monthTotal: null,
    monthlyRate: null
  }

  static getRates ({ squareMeterPrice = null, flatSize = null, depositPercentage = null, interest = null, term = null, ...rest }) {
    let result = {};

    if (!(squareMeterPrice && flatSize)) {
      return Object.assign({}, CreditCalculation.DEFAULT_RESULTS, result);
    }

    result.flatPrice = squareMeterPrice * flatSize;

    if (!depositPercentage) {
      return Object.assign({}, CreditCalculation.DEFAULT_RESULTS, result);
    }

    result.depositTotal = result.flatPrice * (depositPercentage / 100);
    result.loanTotal = result.flatPrice - result.depositTotal;

    if (!term) {
      return Object.assign({}, CreditCalculation.DEFAULT_RESULTS, result);
    }

    result.monthTotal = term * 12;

    if (!interest) {
      return Object.assign({}, CreditCalculation.DEFAULT_RESULTS, result);
    }

    interest = interest / 1200;

    result.monthlyRate = Math.ceil(
      result.loanTotal * (interest) / (1 - (Math.pow(1 / (1 + (interest)), result.monthTotal)))
    );

    return Object.assign({}, CreditCalculation.DEFAULT_RESULTS, result);
  }
}

export default CreditCalculation;
