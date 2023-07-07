export default async (body) => {
  try {
    const url = 'https://fitup-api-sequelize.vercel.app/api/v3/users/authentication';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
