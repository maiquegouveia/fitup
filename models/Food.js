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
    saturated,
    monounsaturated,
    polyunsaturated,
    magnesium,
    sodium,
    zinc,
    potassium,
    vitaminC,
    favoriteFoodId = 0,
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
    this.saturated = saturated;
    this.monounsaturated = monounsaturated;
    this.polyunsaturated = polyunsaturated;
    this.magnesium = magnesium;
    this.sodium = sodium;
    this.potassium = potassium;
    this.zinc = zinc;
    this.vitaminC = vitaminC;
    this.favoriteFoodId = favoriteFoodId;
    this.isFavorite = isFavorite;
  }
}
