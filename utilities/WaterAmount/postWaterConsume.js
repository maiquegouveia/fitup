export default async (userId, amount) => {
  try {
    const response = await fetch(
      `https://fitup-api-production.up.railway.app/api/v1/water/userId/${userId}/amount/${amount}`,
      {
        method: 'POST',
      }
    );
    if (response.status === 500) {
      return { error: 'INTERNAL_SERVER_ERROR' };
    }
  } catch (error) {
    console.log(error);
  }
};
