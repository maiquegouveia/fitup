export default async (userId) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/favoriteFoods/userId/${userId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
  } catch (error) {}
};
