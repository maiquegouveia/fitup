export default async (username) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/users/username/${username}`;
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
