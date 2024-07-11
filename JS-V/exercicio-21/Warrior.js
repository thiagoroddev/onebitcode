import { Character } from "./Character";

class Warrior extends Character {
  constructor(
    name,
    lifePoints,
    atackPoints,
    lifeShield,
    position,
    defensePoints
  ) {
    super(name, lifePoints, atackPoints, defensePoints, position);
    this.lifeShield = position == "d" ? lifeShield : 0;
    this.position = position;
    this.changePosition(position);
  }

  attack(target) {
    super.attack(target);
  }

  changePosition(position) {
    if (this.position == "d") {
      this.position = "a";
      this.defensePoints += this.lifeShield;
    } else {
      this.position = "d";
      this.defensePoints -= this.lifeShield;
    }
  }
}
