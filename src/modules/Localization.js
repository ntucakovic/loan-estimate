import LocalizedStrings from 'react-localization';

const strings = {
  en: {
    squareMeterPrice: 'Price per square',
    flatSize: 'Real estate size',
    depositPercentage: 'Deposit percentage',
    interest: 'Interest percentage',
    term: 'Payment term (in years)',
    flatPrice: 'Real estate price',
    depositTotal: 'Deposit total',
    loanTotal: 'Loan total',
    monthlyRate: 'Monthly rate',
    monthTotal: 'No. months',
    saveCalculation: 'Save calculation',
    deleteCalculation: 'Delete calculation',
    saveCalculationChanges: 'Save calculation changes',
    chooseCalculationName: 'Enter calculation alias, for easier recognition'
  },
  sr: {
    squareMeterPrice: 'Cena m²',
    flatSize: 'Veličina nekretnine m²',
    depositPercentage: 'Procenat depozita',
    interest: 'Procenat kamate',
    term: 'Period otplate (u godinama)',
    flatPrice: 'Cena nekretnine',
    depositTotal: 'Učešće',
    loanTotal: 'Iznos kredita',
    monthlyRate: 'Mesečna rata',
    monthTotal: 'Ukupno meseci',
    saveCalculation: 'Sačuvaj kalkulaciju',
    deleteCalculation: 'Obriši kalkulaciju',
    saveCalculationChanges: 'Sačuvaj izmene kalkulacije',
    chooseCalculationName: 'Unesite naziv kalkulacije, kako biste je lakše pronašli'
  }
};

export default new LocalizedStrings(strings);
