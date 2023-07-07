export default async (body) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/users`;
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await result.json();
    return data.result;
  } catch (error) {}
};
