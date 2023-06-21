export default async (email, codeClient) => {
  try {
    const url = `https://fitup-api-production.up.railway.app/api/v1/mailer/accountConfirmation`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, codeClient }),
    });
    if (!response.ok) return { error: 'Tente novamente mais tarde!' };
  } catch (err) {
    console.log(err);
  }
};
