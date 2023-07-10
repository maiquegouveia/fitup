export default async (email, password) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/users/password`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.status;
  } catch (err) {
    console.log(err);
  }
};
