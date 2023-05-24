export default async userId => {
  try {
    const response = await fetch(`https://fitup-api-production.up.railway.app/api/v1/favoriteFoods/${userId}`);
    if (!response.ok) return { error: 'Tente novamente mais tarde!' };
    const data = await response.json();
    if (data.data.length === 0) return { error: 'Nenhum alimento na lista de favorito!' };
    return data.data;
  } catch (error) {}
};
