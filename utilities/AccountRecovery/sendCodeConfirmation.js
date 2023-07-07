export default async (email, codeClient) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/mailer/accountConfirmation`;
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
