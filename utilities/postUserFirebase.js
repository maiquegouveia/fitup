export default async dataUser => {
  try {
    const response = await fetch('https://fitup-b9b55-default-rtdb.firebaseio.com/users.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUser),
    });

    if (!response.ok) throw new Error('ERROR_POST_FIREBASE');
  } catch (error) {
    console.log(error);
  }
};
