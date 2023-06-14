export default async (userId, value) => {
  try {
    const url = `https://fitup-api-production.up.railway.app/api/v1/users/${userId}/profile-picture`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: value,
      }),
    });
    if (!response.ok) return { error: response.status };
  } catch (error) {
    console.log(error);
  }
};
