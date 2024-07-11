class Character {
  constructor(name, lifePoints, atackPoints, defensePoints) {
    this.name = name;
    this.lifePoints = lifePoints;
    this.atackPoints = atackPoints;
    this.defensePoints = defensePoints;
  }

  attack(target) {
    console.log(target.lifePoints);
    target.lifePoints =
      target.lifePoints - (this.atackPoints - target.defensePoints);
    console.log("Receba");
    console.log(target.lifePoints);
  }
}

module.exports = Character;
