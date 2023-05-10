const getDataFirebase = async email => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //Conectando com o banco de dados do firebase, selecionando o email como chave para consulta
    const response = await fetch(
      `https://fitup-b9b55-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${email}"`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getDataFirebase;
