export default async (dishId) => {
  try {
    const url = `https://fitup-api-production.up.railway.app/api/v1/dishes/dishId/${dishId}`;
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
