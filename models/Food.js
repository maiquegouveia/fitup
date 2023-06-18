export default class Food {
  constructor(
    id,
    category,
    name,
    kcal,
    carbohydrates,
    protein,
    calcium,
    iron,
    saturared,
    monounsaturated,
    polyunsaturared,
    magnesium,
    sodium,
    zinc,
    potassium,
    vitaminC,
    isFavorite = true
  ) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.kcal = kcal;
    this.carbohydrates = carbohydrates;
    this.protein = protein;
    this.calcium = calcium;
    this.iron = iron;
    this.saturared = saturared;
    this.monounsaturated = monounsaturated;
    this.polyunsaturared = polyunsaturared;
    this.magnesium = magnesium;
    this.sodium = sodium;
    this.potassium = potassium;
    this.zinc = zinc;
    this.vitaminC = vitaminC;
    this.isFavorite = isFavorite;
  }
}
