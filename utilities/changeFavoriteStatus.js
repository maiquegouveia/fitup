export default async (userId, foodId, favoriteFoodId, operation = 'add') => {
  if (operation === 'add') {
    try {
      const url = `https://fitup-api-sequelize.vercel.app/api/v3/favoriteFoods/userId/${userId}/food/${foodId}`;
      const response = await fetch(url, {
        method: 'POST',
      });
      if (!response.ok) return { error: 'Tente novamente mais tarde!' };
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await fetch(
        `https://fitup-api-sequelize.vercel.app/api/v3/favoriteFoods/${favoriteFoodId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) return { error: 'Tente novamente mais tarde!' };
    } catch (error) {
      console.log(error);
    }
  }
};
