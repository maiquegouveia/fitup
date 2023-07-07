export default class Dish {
  constructor(
    id,
    name,
    category,
    kcal,
    carbohydrates,
    protein,
    vitaminC,
    saturated,
    monounsaturated,
    polyunsaturated,
    sodium,
    iron,
    calcium,
    potassium,
    magnesium,
    zinc,
    dishItems
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.kcal = kcal;
    this.carbohydrates = carbohydrates;
    this.protein = protein;
    this.vitaminC = vitaminC;
    this.saturated = saturated;
    this.monounsaturated = monounsaturated;
    this.polyunsaturated = polyunsaturated;
    this.sodium = sodium;
    this.iron = iron;
    this.calcium = calcium;
    this.potassium = potassium;
    this.magnesium = magnesium;
    this.zinc = zinc;
    this.dishItems = dishItems;
  }

  getTotalInformation(information) {
    try {
      const total = this.dishItems.reduce((acc, item) => {
        return acc + (item.food[information] * item.amount) / 100;
      }, 0);
      return total.toFixed(1);
    } catch (error) {
      console.log(error);
    }
  }
}
