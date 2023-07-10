export default class DishItem {
  constructor(amount, favoriteFoodId, food) {
    this.amount = amount;
    this.favoriteFoodId = favoriteFoodId;
    this.food = food;
  }

  getInformation(information) {
    const total = (this.food[information] * this.amount) / 100;
    return total.toFixed(1);
  }
}
