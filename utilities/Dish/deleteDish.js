export default async (dishId) => {
  try {
    const url = `https://fitup-api-production.up.railway.app/api/v1/dishes/dishId/${dishId}`;
    const response = await fetch(url, { method: 'DELETE' });
    return response.ok;
  } catch (error) {}
};
