export default async email => {
  try {
    const response = await fetch(`https://fitup-api-production.up.railway.app/api/v1/users/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 404) {
      throw Error('USER_NOT_FOUND');
    } else if (response.status === 500) {
      throw Error('INTERNAL_SERVER_ERROR');
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return {};
  }
};
