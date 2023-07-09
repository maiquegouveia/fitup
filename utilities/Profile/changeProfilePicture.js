export default async (userId, imageUrl) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/users/profilePicture`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: imageUrl,
        userId,
      }),
    });

    if (!response.ok) return { error: response.status };
  } catch (error) {
    console.log(error);
  }
};
