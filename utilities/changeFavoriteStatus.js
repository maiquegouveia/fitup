export default async (userId, foodId) => {
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
};
