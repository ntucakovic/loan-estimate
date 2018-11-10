import LocalizedStrings from "react-localization";

const strings = {
  en: {
    squareMeterPrice: "Price per square",
    flatSize: "Square footage",
    depositPercentage: "Deposit",
    interest: "Interest",
    term: "Payment term (in years)",
    totalAmount: "Real estate value",
    depositTotal: "Deposit total",
    loanTotal: "Loan total",
    monthlyRate: "Payoff details",
    monthTotal: "No. months",
    months: "months",
    saveCalculation: "Save calculation",
    deleteCalculation: "Delete calculation",
    saveCalculationChanges: "Save calculation changes",
    chooseCalculationName: "Enter calculation alias, for easier recognition",
    share: "Share on: ",
    currency: "Currency"
  },
  sr: {
    squareMeterPrice: "Cena/m²",
    flatSize: "Kvadratura",
    depositPercentage: "Depozit",
    interest: "Kamata",
    term: "Period otplate (u godinama)",
    totalAmount: "Vrednost nekretnine",
    depositTotal: "Učešće",
    loanTotal: "Iznos kredita",
    monthlyRate: "Detalji otplate",
    monthTotal: "Ukupno meseci",
    months: "meseci",
    saveCalculation: "Sačuvaj kalkulaciju",
    deleteCalculation: "Obriši kalkulaciju",
    saveCalculationChanges: "Sačuvaj izmene kalkulacije",
    chooseCalculationName:
      "Unesite naziv kalkulacije, kako biste je lakše pronašli",
    share: "Podeli na: ",
    currency: "Valuta"
  }
};

export default new LocalizedStrings(strings);
