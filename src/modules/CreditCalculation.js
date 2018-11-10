class CreditCalculation {
  static DEFAULT_RESULTS = {
    totalAmount: null,
    depositTotal: null,
    loanTotal: null,
    monthTotal: null,
    monthlyRate: null
  };

  static getRates({
    totalAmountInput = null,
    squareMeterPrice = null,
    flatSize = null,
    depositPercentage = null,
    interest = null,
    term = null,
    ...rest
  }) {
    let result = {};

    if (!(squareMeterPrice && flatSize) && !totalAmountInput) {
      return Object.assign({}, CreditCalculation.DEFAULT_RESULTS, result);
    }

    result.totalAmount = totalAmountInput || squareMeterPrice * flatSize;

    if (!depositPercentage) {
      return Object.assign({}, CreditCalculation.DEFAULT_RESULTS, result);
    }

    result.depositTotal = result.totalAmount * (depositPercentage / 100);
    result.loanTotal = result.totalAmount - result.depositTotal;

    if (!term) {
      return Object.assign({}, CreditCalculation.DEFAULT_RESULTS, result);
    }

    result.monthTotal = term * 12;

    if (!interest) {
      return Object.assign({}, CreditCalculation.DEFAULT_RESULTS, result);
    }

    interest = interest / 1200;

    result.monthlyRate = Math.ceil(
      (result.loanTotal * interest) /
        (1 - Math.pow(1 / (1 + interest), result.monthTotal))
    );

    return Object.assign({}, CreditCalculation.DEFAULT_RESULTS, result);
  }
}

export default CreditCalculation;
