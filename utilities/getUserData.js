export default async (email) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/users/email/${email}`;
    const response = await fetch(url);
    const { status } = response;
    if (status === 200) {
      return { error: 'USER_NOT_FOUND' };
    } else if (status === 500) {
      return { error: 'INTERNAL_SERVER_ERROR' };
    }
  } catch (err) {
    return { error: err };
  }
};
