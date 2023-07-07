export default async (dishId, foods) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/dishes/${dishId}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foods),
    });

    return { status: response.status };
  } catch (error) {
    console.log(error);
  }
};
