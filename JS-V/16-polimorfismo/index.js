class Vehicle {
  move() {
    console.log("Veículo andando");
  }
}

class Car extends Vehicle {
  move() {
    console.log("Carro andando");
  }
}

const carmae = new Vehicle();
const car = new Car();

console.log(carmae.move());
console.log(car.move());
