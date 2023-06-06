export default async (userId) => {
  try {
    const url = `https://fitup-api-production.up.railway.app/api/v1/dishes/${userId}`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
