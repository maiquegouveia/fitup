export default async (userId) => {
  try {
    const url = `https://fitup-api-production.up.railway.app/api/v2/users/${userId}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
  } catch (error) {}
};
