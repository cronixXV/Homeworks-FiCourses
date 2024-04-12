class ProductFurniture extends AbstractProduct {
  color = false;
  sizes = {};

  constructor(name, price, rating, comment, color = false, sizes = {}) {
    super(name, price, rating, comment);
    this.color = color;
    this.sizes = sizes;
  }
}
