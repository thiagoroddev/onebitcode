module.exports = class Product {
  constructor(name, description, price, inStock = 0) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.inStock = inStock;
  }

  addToStock(quantity) {
    this.inStock += quantity;
    console.log(`Added ${quantity} to stock.`);
  }

  removeFromStock(quantity) {
    this.inStock -= quantity;
  }
};
