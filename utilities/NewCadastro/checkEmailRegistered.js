export default async (email) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/users/email/${email}`;
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
    if (response.status === 409) {
      return { error: data.message };
    }
  } catch (error) {
    console.log(error);
  }
};
