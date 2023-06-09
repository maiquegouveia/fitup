export default async (userId) => {
  try {
    const url = `https://fitup-api-production.up.railway.app/api/v1/dishes/${userId}`;
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
