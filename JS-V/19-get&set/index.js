class Wallet {
  #amount;
  #username;

  constructor() {
    this.#amount = 100.99 * 1000;
    console.log(this.#amount);
  }

  get amount() {
    return this.#amount / 100;
  }

  set username(newUsername) {
    this.#username = newUsername;
  }

  get username() {
    return this.#username;
  }
}

const myWallet = new Wallet();
console.log(myWallet.amount);

myWallet.username = "Eu";
console.log(myWallet.username);
