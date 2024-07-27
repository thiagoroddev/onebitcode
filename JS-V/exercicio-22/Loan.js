const Installment = require("./Installment");

module.exports = class Loan {
  static #fee = 1.05;

  constructor(value, installments) {
    this.value = value;
    this.installments = [];
    for (let i = 1; i <= installments; i++) {
      this.installments.push(
        new Installment((value * Loan.#fee) / installments, i)
      );
    }
    this.createAt = new Date();
  }

  static get fee() {
    return Loan.#fee;
  }

  static set fee(newFeePorcentage) {
    Loan.#fee = 1 + newFeePorcentage / 100;
  }
};
