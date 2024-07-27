const App = require("./App");

App.createUser("isaac@gmail.com", "isaac");
App.createUser("matheus@gmail.com", "matheus");
App.createUser("thiago@gmail.com", "thiago");

App.deposit("isaac@gmail.com", 100);
App.transfer("isaac@gmail.com", "matheus@gmail.com", 20);

App.changeLoanFee(10);
App.takeLoan("thiago@gmail.com", 2000, 24);

console.log(App.findUser("isaac@gmail.com"));
console.log(App.findUser("isaac@gmail.com").account);
console.log(App.findUser("matheus@gmail.com"));
console.log(App.findUser("matheus@gmail.com").account);
console.log(App.findUser("thiago@gmail.com"));
console.log(App.findUser("thiago@gmail.com").account);
console.log(App.findUser("thiago@gmail.com").account.loans[0].installments);
