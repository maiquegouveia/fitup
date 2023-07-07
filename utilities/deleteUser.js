export default async (userId) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/users/${userId}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
};
