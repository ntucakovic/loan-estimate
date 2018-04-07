import LocalizedStrings from 'react-localization';

const strings = {
  en: {
    squareMeterPrice: 'Price per square',
    flatSize: 'Square footage',
    depositPercentage: 'Deposit',
    interest: 'Interest',
    term: 'Payment term (in years)',
    totalAmount: 'Real estate value',
    depositTotal: 'Deposit total',
    loanTotal: 'Loan total',
    monthlyRate: 'Payoff',
    monthTotal: 'No. months',
    months: 'months',
    saveCalculation: 'Save calculation',
    deleteCalculation: 'Delete calculation',
    saveCalculationChanges: 'Save calculation changes',
    chooseCalculationName: 'Enter calculation alias, for easier recognition'
  },
  sr: {
    squareMeterPrice: 'Cena po m²',
    flatSize: 'Kvadratura (m²)',
    depositPercentage: 'Depozit',
    interest: 'Kamata',
    term: 'Period otplate (u godinama)',
    totalAmount: 'Vrednost nekretnine',
    depositTotal: 'Učešće',
    loanTotal: 'Iznos kredita',
    monthlyRate: 'Otplata',
    monthTotal: 'Ukupno meseci',
    months: 'meseci',
    saveCalculation: 'Sačuvaj kalkulaciju',
    deleteCalculation: 'Obriši kalkulaciju',
    saveCalculationChanges: 'Sačuvaj izmene kalkulacije',
    chooseCalculationName: 'Unesite naziv kalkulacije, kako biste je lakše pronašli'
  }
};

export default new LocalizedStrings(strings);
