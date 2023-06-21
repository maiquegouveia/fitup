export default async (body) => {
  try {
    const url = `https://fitup-api-production.up.railway.app/api/v2/users`;
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await result.json();

    if (!result.ok) {
      return data?.result;
    }
  } catch (error) {}
};
