const Product = require("./Procuct");

module.exports = class Book extends Product {
  constructor(
    title,
    synopsis,
    genre,
    pages,
    author,
    description,
    price,
    inStock = 0
  ) {
    super(` Livro> ${title} `, description, price, inStock);
    this.synopsis = synopsis;
    this.price = price;
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.pages = pages;
  }
};
