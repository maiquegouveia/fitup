export default async userId => {
  try {
    const response = await fetch(`https://fitup-api-production.up.railway.app/api/v1/favoriteFoods/${userId}`);
    if (response.status === 500) return { error: 'Tente novamente mais tarde!' };
    if (response.status === 404) return { error: 'Nenhum alimento na lista de favorito!' };
    const data = await response.json();
    return data.data;
  } catch (error) {}
};
