/*

class Spaceship {
	// Modificamos a propriedade para não haver conflito com os
	// accessors já que _name nunca vai ser usado fora da classe
  private _name
  protected captain
  protected speed

	// accessor get
  get name() {
    return this._name
  }

	// accessor set
  set name(name) {
    this._name = name
  }

  constructor(name, captain) {
    this._name = name
    this.captain = captain
    this.speed = 0
  }

  public accelerate(rate, time) {
    this.speed = rate * time
  }
}

class Fighter extends Spaceship {
  weapons: number

  shoot() {
    for (let i = 0; i < this.weapons; i++) {
      console.log('Pew!')
    }
  }

  erase() {
		// Repare que agora não temos mais o erro em this.name
		// pois this.name agora é o accessor de _name, mas
		// teríamos um erro se tentássemos utilizar this._name
    this.name = ''
    this.captain = ''
  }
}

let ship = new Spaceship('USS Enterprise', 'James T. Kirk')

// Por não ter accessor, speed não é acessível aqui
ship.speed = 50
ship.accelerate(50, 10)



// Também poderíamos utilizar outras convenções de nomenclaturas
// mas a documentação do TypeScript utiliza a primeira: _propriedade
class Spaceship {
  private name
  protected captain
  protected speed

	// accessor get
  get getName() {
    return this.name
  }

	// accessor set
  set setName(newName) {
    this.name = newName
  }

  constructor(name, captain) {
    this.name = name
    this.captain = captain
    this.speed = 0
  }

  public accelerate(rate, time) {
    this.speed = rate * time
  }
}

