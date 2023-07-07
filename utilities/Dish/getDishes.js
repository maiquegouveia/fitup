export default async (userId) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/dishes/userId/${userId}`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const { result } = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
