export default class ConsumedWater {
  constructor(consumedWater) {
    this.consumedWater = consumedWater;
  }

  addConsume(amount) {
    const newConsume = {
      amount,
      createdAt: this._getTimestampToday(),
    };
    this.consumedWater.push(newConsume);
  }

  getDaily() {
    const dailyConsume = this.consumedWater.filter((curr) => this._isTimestampToday(curr.createdAt));
    return dailyConsume.reduce((acc, curr) => acc + curr.amount, 0);
  }

  getDailyProgress(total) {
    const daily = this.getDaily();
    if (daily > 0) {
      const progress = (daily / total) * 100;
      if (progress >= 100) return 100;
      else return progress;
    }
    return 0;
  }

  _getTimestampToday() {
    return Date.now();
  }

  _isTimestampToday(timestamp) {
    const currentDate = new Date();
    const givenDate = new Date(timestamp);

    return (
      givenDate.getFullYear() === currentDate.getFullYear() &&
      givenDate.getMonth() === currentDate.getMonth() &&
      givenDate.getDate() === currentDate.getDate()
    );
  }
}
