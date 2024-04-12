class Basket {
  products = [];

  constructor(products) {
    this.products = products;
  }

  addProduct(product) {
    this.products = [...this.products, product];
  }

  removeProduct(product) {
    this.products = this.products.filter(function (productItem) {
      return productItem !== product;
    });
  }
}
