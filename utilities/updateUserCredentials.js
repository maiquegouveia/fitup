export default async (userId) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/users/${userId}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) return data;
    else return { error: 404 };
  } catch (err) {
    console.log(err);
  }
};
