module.exports = class Order {
  #total;
  #items;
  #user;

  constructor(items, user) {
    items.forEach(({ product, quantity }) => {
      if (quantity > product.inStock) {
        throw new Error(`Quantidade insuficiente`);
      }
    });
    this.#items = items;
    this.#user = user;
    this.#total.reduce(
      (sum, { product, quantity }) => sum + product.price * quantity,
      0
    );
  }

  get data() {
    return {
      items: this.#items,
      total: this.#total,
      user: this.#user,
    };
  }
};
