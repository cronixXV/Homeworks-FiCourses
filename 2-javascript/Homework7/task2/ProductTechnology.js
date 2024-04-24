class ProductTechnology extends AbstractProduct {
  constructor(name, price, rating, comment, battery = false, diagonal = false) {
    super(name, price, rating, comment);
    this.battery = battery;
    this.diagonal = diagonal;
  }
}
