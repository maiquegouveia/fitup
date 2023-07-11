export default async (userId, dishId, text) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/dishes/${dishId}/comments`;
    const data = {
      user_id: userId,
      text,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) return { error: response.status };
  } catch (error) {
    console.log(error);
  }
};
