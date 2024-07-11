// import { Character } from "./Character";
const Character = require("./Character");

class Thief extends Character {
  constructor(name, lifePoints, atackPoints, defensePoints) {
    super(name, lifePoints, atackPoints, defensePoints);
    this.attack(target);
  }

  attack(target) {
    console.log(target.lifePoints);
    target.lifePoints -= (this.atackPoints - target.defensePoints) * 2;
    console.log("Receba");
    console.log(target.lifePoints);
  }
}

module.exports = Thief;
