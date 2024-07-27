module.exports = class Deposit {
  constructor(value) {
    this.value = value;
    this.createAt = new Date();
  }
};
