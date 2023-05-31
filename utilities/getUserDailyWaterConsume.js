export default async (userId) => {
  try {
    const response = await fetch(`https://fitup-api-production.up.railway.app/api/v1/water/userId/${userId}`, {
      method: 'GET',
    });
    // if(response.status === 500)
    if (response.status === 404) return 0;
    const { result: data } = await response.json();
    const waterAmount = data.reduce((acc, curr) => acc + curr.quantidade, 0);
    return waterAmount;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
