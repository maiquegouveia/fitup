export default async (username) => {
  try {
    const url = `https://fitup-api-production.up.railway.app/api/v2/users/${username}`;
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
