export default async (userId, foodId, operation = 'add') => {
  if (operation === 'add') {
    try {
      const response = await fetch(
        `https://fitup-api-production.up.railway.app/api/v1/favoriteFoods/${userId}/${foodId}`,
        {
          method: 'POST',
        }
      );
      if (!response.ok) return { error: 'Tente novamente mais tarde!' };
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await fetch(
        `https://fitup-api-production.up.railway.app/api/v1/favoriteFoods/${userId}/${foodId}`,
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
