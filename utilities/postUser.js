export default async dataUser => {
  try {
    const response = await fetch('https://fitup-api-production.up.railway.app/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUser),
    });

    if (!response.ok) throw new Error('ERROR_POST_USER');
  } catch (error) {
    console.log(error);
  }
};
