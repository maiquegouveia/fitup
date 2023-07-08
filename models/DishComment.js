import timestampToDate from '../utilities/timestampToDate';

export default class DishComment {
  constructor(id, text, createdAt, user) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.user = user;
  }

  getCreatedAt() {
    return timestampToDate(this.createdAt);
  }
}
