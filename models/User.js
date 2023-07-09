import fetchUserFavoriteFoods from '../utilities/FavoriteFoods/getUserFavoriteFoods';
import getWaterConsume from '../utilities/getWaterConsume';
import fetchUserDishes from '../utilities/Dish/getDishes';
import timestampToDate from '../utilities/timestampToDate';
import Food from './Food';
import Dish from './Dish';
import DishCategory from './DishCategory';
import DishItem from './DishItem';
import DishComment from './DishComment';
import ConsumedWater from './ConsumedWater';

export default class User {
  constructor(
    id,
    name,
    email,
    password,
    height,
    weight,
    phone,
    username,
    type,
    createdAt,
    profilePicture = 'https://i.ibb.co/tJBC4C4/default-profile.png'
  ) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.profilePicture = profilePicture;
    this.favoriteFoods = [];
    this.dishes = [];
    this.totalWater = 0;
    this.type = type;
    this.username = username;
    this.createdAt = createdAt;
    this.consumedWater = new ConsumedWater([]);
  }

  setTotalWater() {
    if (this.weight) {
      this.totalWater = this.weight * 35;
    }
  }

  async setWaterConsume() {
    const arr = await getWaterConsume(this.id);
    this.consumedWater.consumedWater = arr;
  }

  async getFavoriteFoods() {
    const foods = await fetchUserFavoriteFoods(this.id);
    if (foods.length > 0) {
      this.favoriteFoods = foods.map(
        (food) =>
          new Food(
            food.Food.food_id,
            food.Food.FoodCategory.name,
            food.Food.name,
            food.Food.kcal,
            food.Food.carbohydrates,
            food.Food.protein,
            food.Food.calcium,
            food.Food.iron,
            food.Food.saturated,
            food.Food.monounsaturated,
            food.Food.polyunsaturated,
            food.Food.magnesium,
            food.Food.sodium,
            food.Food.zinc,
            food.Food.potassium,
            food.Food.vitaminC,
            food.favorite_food_id
          )
      );
    } else {
      this.favoriteFoods = [];
    }
  }

  async getDishes() {
    const dishes = await fetchUserDishes(this.id);
    this.dishes = dishes.map((dish) => {
      const { DishItems, DishComments } = dish;
      const dishCategory = new DishCategory(dish.DishCategory.id, dish.DishCategory.name);
      const items = DishItems.map((item) => {
        const { FavoriteFood } = item;
        return new DishItem(item.amount, FavoriteFood.favorite_food_id, FavoriteFood.Food);
      });
      const dishComments = DishComments.map((comment) => {
        const user = new User(
          comment.User.user_id,
          comment.User.name,
          null,
          null,
          null,
          null,
          null,
          comment.User.username,
          comment.User.type,
          null,
          comment.User.profile_picture
        );
        return new DishComment(comment.comment_id, comment.text, comment.createdAt, user);
      });
      return new Dish(
        dish.dish_id,
        dish.name,
        dishCategory,
        dish.kcal,
        dish.carbohydrates,
        dish.protein,
        dish.vitaminC,
        dish.saturated,
        dish.monounsaturated,
        dish.polyunsaturated,
        dish.sodium,
        dish.iron,
        dish.calcium,
        dish.potassium,
        dish.magnesium,
        dish.zinc,
        items,
        dishComments,
        dish.createdAt
      );
    });
  }

  getFavoriteFoodsId() {
    if (this.favoriteFoods.length > 0) {
      return this.favoriteFoods.map((food) => {
        return {
          foodId: food.id,
          favoriteId: food.favoriteFoodId,
        };
      });
    } else {
      return [];
    }
  }

  getRegistrationProgress() {
    let per = 1;
    const x = per / 7;
    if (this.height === null) per -= x;
    if (this.email === null) per -= x;
    if (this.weight === null) per -= x;
    if (this.profile_picture === 'https://i.ibb.co/tJBC4C4/default-profile.png') per -= x;
    if (this.phone === null) per -= x;
    if (this.password === null) per -= x;
    if (this.name === null) per -= x;
    return per;
  }

  getCreatedAt() {
    return timestampToDate(this.createdAt);
  }

  clone() {
    const clonedObject = new User();
    clonedObject.id = this.id;
    clonedObject.name = this.name;
    clonedObject.email = this.email;
    clonedObject.password = this.password;
    clonedObject.height = this.height;
    clonedObject.weight = this.weight;
    clonedObject.favoriteFoods = this.favoriteFoods;
    clonedObject.dishes = this.dishes;
    clonedObject.profilePicture = this.profilePicture;
    clonedObject.phone = this.phone;
    clonedObject.consumedWater = this.consumedWater;
    clonedObject.totalWater = this.totalWater;
    clonedObject.type = this.type;
    clonedObject.username = this.username;
    clonedObject.createdAt = this.createdAt;
    return clonedObject;
  }
}
