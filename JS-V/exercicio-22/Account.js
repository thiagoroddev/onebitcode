module.exports = class Account {
  #balance;

  constructor(user) {
    this.owner = user;
    this.#balance = 0;
    this.deposits = [];
    this.loans = [];
    this.transfers = [];
  }

  get balance() {
    return this.#balance;
  }

  addDeposit(deposit) {
    this.#balance += deposit.value;
    this.deposits.push(deposit);
  }

  addLoan(loan) {
    this.#balance = +loan.value;
    this.loans.push(loan);
  }

  addTransfer(transfers) {
    if (transfers.toUser.email === this.owner.email) {
      this.#balance += transfers.value;
    } else if (transfers.fromUser.email === this.owner.email) {
      this.#balance -= transfers.value;
      this.transfers.push(transfers);
    }
  }
};
