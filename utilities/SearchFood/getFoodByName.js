export default async foodName => {
  try {
    if (foodName === '') return { error_message: 'Digite o nome de um alimento!' };
    const response = await fetch(`https://fitup-api-production.up.railway.app/api/v1/foods/search=${foodName}`);
    if (response.status === 404) return { error_message: 'Alimento não encontrado!' }; // FOOD_NOT_FOUND
    if (response.status === 500) return { error_message: 'Tente novamente mais tarde!' }; //INTERNAL_SERVER_ERROR;
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
