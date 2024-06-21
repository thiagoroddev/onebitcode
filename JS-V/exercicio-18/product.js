class Product {
    constructor(name, description, price, inStock) {
        this.name = name
        this.description = description
        this.price = price
        this.inStock = 0
    }

    addOnStock(amount) {
        this.inStock += amount
        console.log(`Foi add ${amount} ao estoque`)
    }
}

let productOne = new Product('Leite', 'Produdo alimentício', 11.99, 10)

console.log(productOne)

productOne.addOnStock(10)

console.log(productOne)
