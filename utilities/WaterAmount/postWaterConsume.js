export default async (userId, amount) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/consumedWater/userId/${userId}/amount/${amount}`;
    const response = await fetch(url, {
      method: 'POST',
    });
    if (response.status === 500) {
      return { error: 'INTERNAL_SERVER_ERROR' };
    }
  } catch (error) {
    console.log(error);
  }
};
