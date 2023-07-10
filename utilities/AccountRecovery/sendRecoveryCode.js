export default async (email, verificationCode) => {
  try {
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/mailer/accountRecovery`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, verificationCode }),
    });
    if (!response.ok) return { error: 'Tente novamente mais tarde!' };
  } catch (err) {
    console.log(err);
  }
};
