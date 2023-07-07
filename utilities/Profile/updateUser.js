export default async (userData) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/users`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const data = await response.json();

      return data.result;
    }
  } catch (error) {
    console.log(error);
  }
};
