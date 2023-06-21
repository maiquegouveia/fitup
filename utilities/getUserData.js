export default async (email) => {
  try {
    const response = await fetch(`https://fitup-api-production.up.railway.app/api/v1/users/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 404) {
      return { error: 'USER_NOT_FOUND' };
    } else if (response.status === 500) {
      return { error: 'INTERNAL_SERVER_ERROR' };
    } else {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    return { error: err };
  }
};
