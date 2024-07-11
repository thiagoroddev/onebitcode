//import { Character } from "./Character";
const Character = require(".Character");

class Mage extends Character {
  constructor(name, lifePoints, atackPoints, defensePoints, magicPoints) {
    super(name, lifePoints, atackPoints, defensePoints);
    this.magicPoints = magicPoints;
  }

  attack(target) {
    target.lifePoints -=
      this.atackPoints + this.magicPoints - target.defensePoints;
    console.log("Receba");
    console.log(target.lifePoints);
  }

  cure(target) {
    target.lifePoints += this.magicPoints * 2;
    console.log("Cura caracter");
    console.log(target.lifePoints);
  }
}
