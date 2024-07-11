class Property {
  constructor(area, price) {
    this.area = area;
    this.price = price;
  }

  getPricePerSquareMeter() {
    return this.price / this.area;
  }
}

class House extends Property {}

const land = new Property(20, 1000);
const somehouse = new House(30, 3000);

console.log(land);
console.log(somehouse);
console.log(land.getPricePerSquareMeter());
console.log(somehouse.getPricePerSquareMeter());

class Apartment extends Property {
  constructor(area, price, numberOfRooms) {
    super(area, price);
    this.numberOfRooms = numberOfRooms;
  }
}
