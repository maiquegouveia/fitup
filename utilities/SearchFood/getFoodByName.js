export default async (foodName) => {
  try {
    if (foodName === '') return { error_message: 'Digite o nome de um alimento!' };
    const url = `https://fitup-api-sequelize.vercel.app/api/v3/foods/foodName/${foodName}`;
    const response = await fetch(url);
    if (response.status === 500) return { error_message: 'Tente novamente mais tarde!' };
    const { result, length } = await response.json();
    if (length === 0) return { error_message: 'Alimento não encontrado!' };
    return result;
  } catch (error) {
    console.log(error);
  }
};
