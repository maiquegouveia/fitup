import getDishCategories from '../utilities/Dish/getDishCategories';

export default class DishCategory {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  static async getCategories() {
    const categories = await getDishCategories();
    return categories;
  }
}
