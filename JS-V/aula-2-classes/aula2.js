

const books = {
    title: "Eragon",
    pages: 468,
    published: true,
    inStock: 20,
    tags: ["fantasy", "adventure", "medieval"],
    author: {
      name: "Christopher Paolini"
    },
    addOnStock(quantity) {
      this.inStock += quantity
    },
    save: function () {
      // Save book data to database
    }
  }
  
  console.log(books)


  function Book(title, pages, tags, author) {
    this.title = title
    this.pages = pages
    this.tags = tags
    this.author = author
    this.published = false
    this.inStock = 0
    this.addOnStock = function addOnStock(quantity) {
      this.inStock += quantity
    }
    this.save = function () {
      // Save book to database
    }
  }
  
  const author = { name: "Christopher Paolini" }
  const tags = ["fantasy", "adventure", "medieval"]
  
  const eragon = new Book("Eragon", 468, tags, author)
  
  eragon.addOnStock(20)
  
  const eldest = new Book("Eldest", 644, tags, author)
  
  console.log(eragon)
  console.log(eldest)