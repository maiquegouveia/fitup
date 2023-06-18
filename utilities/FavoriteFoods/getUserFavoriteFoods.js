export default async (userId) => {
  try {
    const response = await fetch(`https://fitup-api-production.up.railway.app/api/v1/favoriteFoods/${userId}`);
    if (response.status === 500) return [];
    if (response.status === 404) return [];
    const data = await response.json();
    return data.data;
  } catch (error) {}
};
