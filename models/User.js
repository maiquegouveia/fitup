import fetchUserFavoriteFoods from '../utilities/FavoriteFoods/getUserFavoriteFoods';
import fetchUserDailyWaterConsume from '../utilities/getUserDailyWaterConsume';
import fetchUserDishes from '../utilities/Dish/getDishes';
import Food from './Food';
import Dish from './Dish';

export default class User {
  constructor(
    id,
    name,
    email,
    password,
    height,
    weight,
    phone,
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
    this.consumedWater = 0;
    this.favoriteFoods = [];
    this.dishes = [];
    this.totalWater = 0;
  }

  setTotalWater() {
    if (this.weight) {
      this.totalWater = this.weight * 35;
    }
  }

  async getDailyWaterConsume() {
    this.consumedWater = await fetchUserDailyWaterConsume(this.id);
  }

  async getFavoriteFoods() {
    const foods = await fetchUserFavoriteFoods(this.id);
    if (!foods.error) {
      this.favoriteFoods = foods.map(
        (food) =>
          new Food(
            food.alimento_id,
            food.categoria,
            food.nome,
            food.kcal,
            food.carboidrato,
            food.proteina,
            food.calcio,
            food.ferro,
            food.gordura_saturada,
            food.gordura_monoinsaturada,
            food.gordura_poli_insaturada,
            food.magnesio,
            food.sodio,
            food.zinco,
            food.potassio,
            food.vitaminaC
          )
      );
    } else {
      this.favoriteFoods = foods;
    }
  }

  async getDishes() {
    this.dishes = await fetchUserDishes(this.id);
  }

  getFavoriteFoodsId() {
    if (!this.favoriteFoods.error) return this.favoriteFoods.map((food) => food.id);
    else return [];
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
    return clonedObject;
  }
}
