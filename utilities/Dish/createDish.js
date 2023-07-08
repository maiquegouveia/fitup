export default async (dish) => {
  try {
    const url = 'https://fitup-api-sequelize.vercel.app/api/v3/dishes';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dish),
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) return { error: 'INTERNAL_SERVER_ERROR' };
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
