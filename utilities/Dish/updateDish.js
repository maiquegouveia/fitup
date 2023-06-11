export default async (dish) => {
  try {
    const url = `https://fitup-api-production.up.railway.app/api/v1/dishes`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dish),
    });

    return { status: response.status };
  } catch (error) {
    console.log(error);
  }
};
