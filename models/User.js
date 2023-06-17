import fetchUserFavoriteFoods from '../utilities/FavoriteFoods/getUserFavoriteFoods';
import fetchUserDailyWaterConsume from '../utilities/getUserDailyWaterConsume';

export default class User {
  constructor(
    id,
    name,
    email,
    password,
    height,
    weight,
    phone,
    profile_picture = 'https://i.ibb.co/tJBC4C4/default-profile.png'
  ) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.profile_picture = profile_picture;
    this.consumedWater = null;
    this.favoriteFoods = null;
    this.dishes = null;
  }

  async getDailyWaterConsume() {
    this.consumedWater = await fetchUserDailyWaterConsume(this.id);
  }

  async getFavoriteFoods() {
    this.favoriteFoods = await fetchUserFavoriteFoods(this.id);
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
    clonedObject.profile_picture = this.profile_picture;
    clonedObject.phone = this.phone;
    clonedObject.consumedWater = this.consumedWater;
    return clonedObject;
  }
}
